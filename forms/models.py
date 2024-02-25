from django.db import models
from django.conf import settings

class Form(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class Question(models.Model):
    form = models.ForeignKey(Form, related_name='questions', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    category = models.CharField(max_length=255, blank=True, null=True)
    order = models.IntegerField(default=0)  # Add an order field with a default value

    class Meta:
        ordering = ['order']  # Orders the questions in ascending order by default

    def __str__(self):
        return f"{self.text} ({self.category})"

class Answer(models.Model):
    question = models.ForeignKey(Question, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    value = models.IntegerField()

    def __str__(self):
        return f"{self.text} ({self.value})"