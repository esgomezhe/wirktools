from .models import Form, CompletedForm, Category, Diagnostics
from .serializers import FormSerializer, CompletedFormSerializer, CategorySerializer, DiagnosticsSerializer
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

def index(request):
    return render(request, 'index.html')
        
class CompletedFormViewSet(viewsets.ModelViewSet):
    queryset = CompletedForm.objects.all()
    serializer_class = CompletedFormSerializer
    permission_classes = [AllowAny]  # Permite solicitudes no autenticadas

class DiagnosticsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Diagnostics.objects.all().prefetch_related('categorydiagnostics_set__levels')
    serializer_class = DiagnosticsSerializer