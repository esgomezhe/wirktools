from django.db import models
from django.conf import settings
from django.utils.text import slugify
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Form(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    category = models.ForeignKey(Category, related_name='questions', on_delete=models.SET_NULL, null=True, blank=True)
    sub_category = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.text} ({self.category}) [{self.sub_category}]"

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.text} ({self.value})"    
    
class CompletedForm(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    form_title = models.CharField(max_length=255)
    content = models.JSONField()  # Almacena preguntas, respuestas seleccionadas y valores
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.form_title} - {'Anonymous' if self.user is None else self.user.username}"
    
class Diagnostics(models.Model):
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = "Diagnostics"

    def __str__(self):
        return self.title
    
class CategoryDiagnostics(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    diagnostics = models.ForeignKey(Diagnostics, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('category', 'diagnostics')
        verbose_name_plural = "Category Diagnoses"

    def __str__(self):
        return f"{self.category.name} - {self.diagnostics.title}"

class DiagnosticLevel(models.Model):
    category_diagnostics = models.ForeignKey(CategoryDiagnostics, related_name='levels', on_delete=models.CASCADE, null=True)
    level = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.level} - {self.description[:50]}..."  # muestra una parte de la descripción