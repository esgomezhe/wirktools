from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.exceptions import TokenError
from mentoring.models import Mentoring
from .serializers import UserSerializer

User = get_user_model()

@method_decorator(ensure_csrf_cookie, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        document = request.data.get('document')
        password = request.data.get('password')
        user = User.objects.filter(document=document).first()
        if user is None:
            return Response({'detail': 'Usuario no registrado.'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.check_password(password):
            return Response({'detail': 'Contraseña incorrecta.'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'id': user.id
        })

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class UserDetailsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = request.user
        mentoring = Mentoring.objects.get(user=user)
        response_data = {
            'document': user.document,
            'email': user.email,
            'full_name': user.full_name,
            'is_mentor': mentoring.is_mentor,
            'is_apprentice': mentoring.is_apprentice,
            'id': user.id
        }

        if mentoring.is_mentor:
            response_data['about'] = mentoring.about
            response_data['rating'] = mentoring.rating
            response_data['categories'] = [
                {"id": category.id, "name": category.name, "slug": category.slug}
                for category in mentoring.categories.all()
            ]

        return Response(response_data)