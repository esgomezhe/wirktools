from rest_framework import serializers
from .models import Form, Question, Answer, CompletedForm, Category, DiagnosticLevel, DiagnosticPlan

class DiagnosticPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosticPlan
        fields = ['text']

class DiagnosticLevelSerializer(serializers.ModelSerializer):
    plans = DiagnosticPlanSerializer(many=True, read_only=True)
    class Meta:
        model = DiagnosticLevel
        fields = ['level', 'plans']

class CategorySerializer(serializers.ModelSerializer):
    levels = DiagnosticLevelSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'levels']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'text', 'value']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    answers_count = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ['id', 'text', 'category', 'sub_category', 'answers', 'answers_count']
    def get_answers_count(self, obj):
        # Retorna el número de respuestas asociadas a la pregunta
        return obj.answers.count()

class FormSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    #diagnostics = DiagnosticsSerializer(many=False, read_only=True)

    class Meta:
        model = Form
        fields = ['id', 'title', 'questions']

class CompletedFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedForm
        fields = ['id', 'user', 'email','form_title', 'content']