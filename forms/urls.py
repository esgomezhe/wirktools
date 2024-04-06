from django.urls import path, re_path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'forms', views.FormViewSet)
router.register(r'completed-forms', views.CompletedFormViewSet)

urlpatterns = [
    # Asegúrate de definir todas las rutas de API antes de la ruta de captura genérica
    path('api/', include(router.urls)),  # Prefijo todas las rutas de API con 'api/'

    # La ruta de captura genérica para la aplicación React debe ser la última
    re_path(r'^.*$', views.index, name='index'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)