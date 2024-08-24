from django.db import models
from django.conf import settings
from django.core.mail import send_mail
from ckeditor.fields import RichTextField
from django.utils.text import slugify
from .utils import calculate_category_averages, create_work_plans, update_excel_file
import pytz

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

class DiagnosticLevel(models.Model):
    category_diagnostics = models.ForeignKey(Category, related_name='levels', on_delete=models.CASCADE, null=True)
    level = models.IntegerField()

    def __str__(self):
        return f"{self.level}"

class DiagnosticPlan(models.Model):
    level_diagnostics = models.ForeignKey(DiagnosticLevel, related_name='plans', on_delete=models.CASCADE, null=True)
    text = RichTextField(blank=True, null=True)

    def __str__(self):
        return f"{self.level_diagnostics.level}"

class Form(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Formulario'
        verbose_name_plural = 'Formularios'

class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    category = models.ForeignKey(Category, related_name='questions', on_delete=models.SET_NULL, null=True, blank=True)
    sub_category = models.CharField(max_length=255, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)  # Campo de orden

    def __str__(self):
        return f"{self.text} ({self.category}) [{self.sub_category}]"

    class Meta:
        ordering = ['order']  # Ordenar por el campo de orden

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=510)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.text} ({self.value})"

class CompletedForm(models.Model):
    user = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    form_title = models.CharField(max_length=255)
    content = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.form_title} - {self.user} - {self.email}"

    def save(self, *args, **kwargs):
        # Primero, guardar el formulario completado
        super().save(*args, **kwargs)
        
        # Luego, calcular los promedios de categorías y crear los planes de trabajo
        answers = self.content.get('answers', [])
        if answers:
            create_work_plans(answers, self)
        
        # Finalmente, actualizar el archivo Excel con la nueva información
        update_excel_file()

        # Enviar el correo de resultados si el email está presente
        if self.email:
            category_averages = calculate_category_averages(answers)
            email_content = self.build_email_content(category_averages)
            send_mail(
                'Resultados de su Autodiagnóstico',
                '',
                'autodiagnostico@transformaciondigital.com.co',
                [self.email, 'autodiagnostico@transformaciondigital.com.co'],
                fail_silently=False,
                html_message=email_content,
            )

    def build_email_content(self, category_averages):
        content_lines = []
        content_lines.append(f"<p>Formulario: {self.form_title}</p>")
        content_lines.append(f"<p>Usuario: {self.user}</p>")
        content_lines.append(f"<p>Correo: {self.email}</p>")
        content_lines.append(f"<p>Fecha: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}</p>")
        content_lines.append("<h3>Resumen de Diagnóstico:</h3>")
        
        for avg in category_averages:
            content_lines.append(f"<h4>Autodiagnóstico {avg['category']['name']}:</h4>")
            content_lines.append(f"<p>{avg['plan']}</p>")
        
        return "".join(content_lines)
    
    class Meta:
        verbose_name = 'Formulario Completado'
        verbose_name_plural = 'Formularios Completados'
    
class CompletedFormProxy(CompletedForm):
    class Meta:
        proxy = True
        verbose_name = 'Descarga la Base de Datos Completa'
        verbose_name_plural = 'Descarga la Base de Datos Completa'

class WorkPlan(models.Model):
    completed_form = models.ForeignKey('CompletedForm', related_name='work_plans', on_delete=models.CASCADE)
    identification_number = models.CharField(max_length=255, null=True, blank=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    plan = models.TextField()

    def __str__(self):
        return f"Plan for {self.category.name} - Form: {self.completed_form.form_title}"