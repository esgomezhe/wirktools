from .models import Form, CompletedForm
from .serializers import FormSerializer, CompletedFormSerializer
from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.views.decorators.http import require_POST
import json

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer

def index(request):
    return render(request, 'index.html')
        
class CompletedFormViewSet(viewsets.ModelViewSet):
    queryset = CompletedForm.objects.all()
    serializer_class = CompletedFormSerializer
    permission_classes = [AllowAny]  # Permite solicitudes no autenticadas