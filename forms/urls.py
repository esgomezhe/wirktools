from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from . import views

# Configuración del router de DRF
router = DefaultRouter()
router.register(r'forms', views.FormViewSet)
router.register(r'completed-forms', views.CompletedFormViewSet)
router.register(r'work-plans', views.WorkPlanViewSet, basename='work-plan')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/completed-forms/check/<str:document_number>/', views.CheckDocumentView.as_view(), name='check-document'),
    path('api/completed-forms/<int:pk>/delete/', views.CompletedFormViewSet.as_view({'delete': 'delete_form'}), name='delete-form'),
    path('api/category-averages/<str:document_number>/', views.get_category_averages, name='category-averages')
]