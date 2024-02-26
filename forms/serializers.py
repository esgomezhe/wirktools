from rest_framework import serializers
from .models import Form, Question, Answer, CompletedForm

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'value']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'category', 'sub_category', 'answers']

class FormSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Form
        fields = ['id', 'title', 'questions']

class CompletedFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedForm
        fields = ['id', 'user', 'form_title', 'content']