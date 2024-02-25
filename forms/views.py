from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Form
from .serializers import FormSerializer, QuestionSerializer, AnswerSerializer

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

def index(request):
    return render(request, 'index.html')