from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from . import views

# Configuración del router de DRF
router = DefaultRouter()
router.register(r'forms', views.FormViewSet)
router.register(r'completed-forms', views.CompletedFormViewSet)

urlpatterns = [
    # Prefijar todas las rutas de la API con 'api/'
    path('api/', include(router.urls)),

    # La ruta de captura genérica para la aplicación React debe ser la última
    re_path(r'^.*$', views.index, name='index'),
]

# Servir archivos estáticos y media durante el desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)