from rest_framework.permissions import BasePermission, IsAuthenticated
from django.conf import settings

class IsAuthorizedClient(BasePermission):
    def has_permission(self, request, view):
        client_token = request.headers.get('X-Client-Token')
        return client_token == settings.CLIENT_TOKEN
    
class IsAuthorizedClientOrAuthenticated(BasePermission):
    def has_permission(self, request, view):
        is_authorized_client = IsAuthorizedClient().has_permission(request, view)
        is_authenticated = IsAuthenticated().has_permission(request, view)
        return is_authorized_client or is_authenticated