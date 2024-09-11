from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from forms.models import Category
from .models import Availability, Session, Mentoring
from .serializers import AvailabilitySerializer, SessionSerializer, MentorAboutSerializer, MentorCategoriesSerializer, CategorySerializer
from .utils import send_mentoring_email

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

class MentorAvailabilityView(generics.ListCreateAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Availability.objects.filter(mentor=self.request.user).order_by('date', 'start_time')

    def perform_create(self, serializer):
        mentor = self.request.user
        availability = serializer.save(
            mentor=mentor, 
            mentor_name=mentor.full_name  # Asigna el nombre completo del mentor
        )
        
        # Preparar los datos para enviar el correo electrónico
        context = {
            'action': 'Nueva disponibilidad creada',
            'mentor_name': mentor.full_name,
            'apprentice_name': 'N/A',  # No hay aprendiz asociado todavía
            'date': availability.date,
            'start_time': availability.start_time,
            'end_time': availability.end_time,
            'subject': 'Disponibilidad creada',
            'description': f"Has creado una nueva disponibilidad para el {availability.date} desde las {availability.start_time} hasta las {availability.end_time}.",
        }
        
        # Enviar correo al mentor
        send_mentoring_email(
            to_emails=[self.request.user.email],  # Correo del mentor
            subject='Nueva disponibilidad creada',
            context=context
        )

class DeleteAvailabilityView(generics.DestroyAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Availability.objects.filter(mentor=self.request.user).order_by('date', 'start_time')

class MentorSessionsView(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get_queryset(self):
        return Session.objects.filter(availability__mentor=self.request.user).order_by('availability__date')
    
class UpdateSessionStatusView(generics.UpdateAPIView):
    queryset = Session.objects.all()
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def patch(self, request, *args, **kwargs):
        session = self.get_object()
        action = request.data.get('action')

        if action == 'confirm':
            session.is_confirmed = True
            session.save()

            # Enviar correo al mentor
            context = {
                'action': 'La sesión ha sido confirmada',
                'mentor_name': session.availability.mentor.full_name,
                'apprentice_name': session.apprentice.full_name,
                'date': session.availability.date,
                'start_time': session.availability.start_time,
                'end_time': session.availability.end_time,
                'subject': session.subject,
                'description': session.description,
            }
            send_mentoring_email(
                to_emails=[session.availability.mentor.email],
                subject='Una sesión ha sido confirmada',
                context=context
            )

            # Enviar correo al aprendiz
            send_mentoring_email(
                to_emails=[session.apprentice.email],
                subject='Tu sesión ha sido confirmada',
                context=context
            )

            return Response({"status": "session confirmed"}, status=status.HTTP_200_OK)

        elif action == 'reject':
            availability = session.availability  # Guardamos la disponibilidad antes de eliminar la sesión
            session.delete()  # Eliminamos la sesión

            # Enviar correo al mentor
            context = {
                'action': 'La sesión ha sido rechazada',
                'mentor_name': availability.mentor.full_name,
                'apprentice_name': request.user.full_name,
                'date': availability.date,
                'start_time': availability.start_time,
                'end_time': availability.end_time,
                'subject': session.subject,
                'description': session.description,
            }
            send_mentoring_email(
                to_emails=[availability.mentor.email],
                subject='Una sesión ha sido rechazada',
                context=context
            )

            # Enviar correo al aprendiz
            send_mentoring_email(
                to_emails=[request.user.email],
                subject='Tu sesión ha sido rechazada',
                context=context
            )

            return Response({"status": "session rejected and availability freed"}, status=status.HTTP_200_OK)

        return Response({"error": "invalid action"}, status=status.HTTP_400_BAD_REQUEST)
    
class ApprenticeSessionsView(generics.ListCreateAPIView):
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Session.objects.filter(apprentice=self.request.user).order_by('availability__date')

    def perform_create(self, serializer):
        serializer.save(apprentice=self.request.user)

# Vistas no probadas

class AvailableMentorsView(generics.ListAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Obtener todos los mentores con disponibilidad
        all_availabilities = Availability.objects.exclude(mentor=self.request.user).order_by('date', 'start_time')

        # Crear un diccionario para almacenar los mentores únicos
        unique_mentors = {}
        for availability in all_availabilities:
            if availability.mentor_id not in unique_mentors:
                unique_mentors[availability.mentor_id] = availability

        # Retornar las disponibilidades relacionadas con mentores únicos
        return list(unique_mentors.values())

class MentorAvailabilityDetailView(generics.ListAPIView):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        mentor_id = self.request.query_params.get('mentor')
        reserved_availability_ids = Session.objects.values_list('availability_id', flat=True)
        return Availability.objects.filter(mentor_id=mentor_id).exclude(id__in=reserved_availability_ids).order_by('date', 'start_time')
    
class BookSessionView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        availability_id = request.data.get('availability')
        subject = request.data.get('subject', "Mentoring Session")  # Valor por defecto
        description = request.data.get('description', "")

        if not availability_id:
            return Response({"error": "Availability ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            availability = Availability.objects.get(id=availability_id)
        except Availability.DoesNotExist:
            return Response({"error": "Availability not found"}, status=status.HTTP_404_NOT_FOUND)

        # Verifica si la disponibilidad ya está reservada
        if Session.objects.filter(availability=availability).exists():
            return Response({"error": "This session is already booked"}, status=status.HTTP_400_BAD_REQUEST)

        # Crear la sesión para el aprendiz
        session = Session.objects.create(
            apprentice=request.user,
            availability=availability,
            subject=subject,
            description=description
        )

        # Enviar correo al mentor
        context = {
            'action': 'Se ha agendado una sesión',
            'mentor_name': availability.mentor.full_name,
            'apprentice_name': request.user.full_name,
            'date': availability.date,
            'start_time': availability.start_time,
            'end_time': availability.end_time,
            'subject': subject,
            'description': description,
        }
        send_mentoring_email(
            to_emails=[availability.mentor.email],
            subject='Una sesión ha sido agendada',
            context=context
        )

        # Enviar correo al aprendiz
        send_mentoring_email(
            to_emails=[request.user.email],
            subject='Has agendado una sesión',
            context=context
        )

        return Response(SessionSerializer(session).data, status=status.HTTP_201_CREATED)
    
class UpdateMentorAboutView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MentorAboutSerializer

    def patch(self, request, *args, **kwargs):
        mentor_id = kwargs.get('mentor_id')
        about = request.data.get('about')

        try:
            mentoring = Mentoring.objects.get(user_id=mentor_id, is_mentor=True)
            mentoring.about = about
            mentoring.save()
            return Response({"detail": "About updated successfully."}, status=status.HTTP_200_OK)
        except Mentoring.DoesNotExist:
            return Response({"detail": "Mentor not found."}, status=status.HTTP_404_NOT_FOUND)
        
class UpdateMentorCategoriesView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = MentorCategoriesSerializer

    def patch(self, request, *args, **kwargs):
        mentor_id = kwargs.get('mentor_id')
        categories = request.data.get('categories')

        try:
            mentoring = Mentoring.objects.get(user_id=mentor_id, is_mentor=True)
            mentoring.categories.set(categories)
            mentoring.save()
            return Response({"detail": "Categories updated successfully."}, status=status.HTTP_200_OK)
        except Mentoring.DoesNotExist:
            return Response({"detail": "Mentor not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UpdateMentorRatingView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Mentoring.objects.all()

    def patch(self, request, *args, **kwargs):
        mentor_id = kwargs.get('mentor_id')
        new_rating = request.data.get('rating')

        if new_rating is None:
            return Response({"detail": "Rating is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_rating = float(new_rating)
            if not (1 <= new_rating <= 5):
                return Response({"detail": "Rating must be between 1 and 5."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"detail": "Invalid rating value."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            mentoring = Mentoring.objects.get(user_id=mentor_id, is_mentor=True)
            mentoring.add_rating(new_rating)
            return Response({"detail": "Rating updated successfully."}, status=status.HTTP_200_OK)
        except Mentoring.DoesNotExist:
            return Response({"detail": "Mentor not found."}, status=status.HTTP_404_NOT_FOUND)