from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Form(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    category = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.text} ({self.category})"

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