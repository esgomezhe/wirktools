from .models import Form, CompletedForm
from .serializers import FormSerializer, CompletedFormSerializer
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .permissions import IsAuthorizedClientOrAuthenticated

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [IsAuthorizedClientOrAuthenticated]

class CompletedFormViewSet(viewsets.ModelViewSet):
    queryset = CompletedForm.objects.all()
    serializer_class = CompletedFormSerializer
    permission_classes = [IsAuthorizedClientOrAuthenticated]

    def create(self, request, *args, **kwargs):
        # Extraer el número de identificación y el tipo de análisis del contenido del formulario enviado
        identification_number = request.data.get('content', {}).get('info', {}).get('identificationNumber', None)
        form_title = request.data.get('form_title', None)
        if identification_number and form_title:
            # Buscar un formulario existente con el mismo número de identificación y tipo de formulario
            existing_form = CompletedForm.objects.filter(
                content__info__identificationNumber=identification_number,
                form_title=form_title
            ).order_by('-created_at').first()

            # Si existe un formulario, eliminarlo
            if existing_form:
                existing_form.delete()

        # Crear el nuevo formulario
        return super().create(request, *args, **kwargs)

class CheckDocumentView(APIView):
    permission_classes = [IsAuthorizedClientOrAuthenticated]

    def get(self, request, document_number):
        try:
            completed_form = CompletedForm.objects.filter(
                content__info__identificationNumber=document_number
            ).order_by('-created_at').first()

            if completed_form:
                return Response({'exists': True, 'data': completed_form.content, 'id': completed_form.id}, status=status.HTTP_200_OK)
            else:
                return Response({'exists': False}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'exists': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def index(request):
    return render(request, 'index.html')