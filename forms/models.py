from django.db import models
from django.conf import settings

class Form(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    order = models.IntegerField(default=0, editable=False)  # Automatizar este campo más adelante

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.text

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    value = models.IntegerField(default=0)

    def __str__(self):
        return self.text