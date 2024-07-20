from .models import Form, CompletedForm
from .serializers import FormSerializer, CompletedFormSerializer
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

class FormViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Form.objects.all()
    serializer_class = FormSerializer
    permission_classes = [IsAuthenticated]

class CompletedFormViewSet(viewsets.ModelViewSet):
    queryset = CompletedForm.objects.all()
    serializer_class = CompletedFormSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_form(self, request, pk=None):
        completed_form = get_object_or_404(CompletedForm, pk=pk)
        completed_form.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class CheckDocumentView(APIView):
    permission_classes = [AllowAny]

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