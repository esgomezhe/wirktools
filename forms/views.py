from django.shortcuts import render
from .models import Form, CompletedForm, WorkPlan
from .serializers import FormSerializer, CompletedFormSerializer, WorkPlanSerializer
from collections import defaultdict
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAuthorizedClientOrAuthenticated
from .utils import calculate_category_averages
from rest_framework.decorators import api_view

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all().order_by('id')
    serializer_class = FormSerializer
    permission_classes = [IsAuthorizedClientOrAuthenticated]

class CompletedFormViewSet(viewsets.ModelViewSet):
    queryset = CompletedForm.objects.all().order_by('-created_at')
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

class WorkPlanViewSet(viewsets.ModelViewSet):
    serializer_class = WorkPlanSerializer
    permission_classes = [IsAuthorizedClientOrAuthenticated]

    def get_queryset(self):
        return WorkPlan.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        grouped_data = defaultdict(lambda: {'id': None, 'identificationNumber': None, 'plans': []})

        for work_plan in queryset:
            completed_form_id = work_plan.completed_form.id
            if grouped_data[completed_form_id]['id'] is None:
                grouped_data[completed_form_id]['id'] = completed_form_id
                grouped_data[completed_form_id]['identificationNumber'] = work_plan.identification_number

            category_info = {
                'id': work_plan.category.id,
                'name': work_plan.category.name,
                'slug': work_plan.category.slug,
                'plan': work_plan.plan,
            }
            grouped_data[completed_form_id]['plans'].append(category_info)

        paginated_data = self.paginate_queryset(list(grouped_data.values()))

        if paginated_data is not None:
            return self.get_paginated_response(paginated_data)

        return Response(list(grouped_data.values()))
    
@api_view(['GET'])
def get_category_averages(request, document_number):
    completed_form = CompletedForm.objects.filter(
        content__info__identificationNumber=document_number
    ).order_by('-created_at').first()

    if not completed_form:
        return Response({'exists': False}, status=404)

    category_averages = calculate_category_averages(completed_form.content.get('answers', []))
    return Response({'exists': True, 'category_averages': category_averages})