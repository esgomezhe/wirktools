from django.db import models
from django.conf import settings
from django.core.mail import send_mail
from ckeditor.fields import RichTextField
from django.utils.text import slugify
from .utils import calculate_category_averages

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
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.text} ({self.category}) [{self.sub_category}]"

    class Meta:
        ordering = ['order']

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
    '''
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        answers = self.content.get('answers', [])

        if self.email:
            category_averages = calculate_category_averages(answers)
            email_content = self.build_email_content(category_averages)
            send_mail(
                'Resultados de su Autodiagnóstico',
                '',
                'autodiagnostico@wirkconsultingtools.com',
                [self.email, 'autodiagnostico@wirkconsultingtools.com'],
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
    '''
    class Meta:
        verbose_name = 'Formulario completado'
        verbose_name_plural = 'Formularios completados'
    
class CompletedFormProxy(CompletedForm):
    class Meta:
        proxy = True
        verbose_name = 'Descarga la base de datos completa'
        verbose_name_plural = 'Descarga la base de datos completa'