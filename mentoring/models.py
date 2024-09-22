from django.db import models
from django.conf import settings
from forms.models import Category

class Mentoring(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_mentor = models.BooleanField(default=False)
    is_apprentice = models.BooleanField(default=False)
    about = models.TextField(blank=True, null=True)  # Acerca del mentor
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)  # Rating promedio del mentor
    total_ratings = models.PositiveIntegerField(default=0)  # Número total de calificaciones
    ratings_sum = models.PositiveIntegerField(default=0)  # Suma de todas las calificaciones
    categories = models.ManyToManyField(Category, related_name='mentors')  # Relación con categorías

    def add_rating(self, new_rating):
        """Añadir una nueva calificación y actualizar el rating promedio"""
        self.total_ratings += 1
        self.ratings_sum += new_rating
        self.rating = self.ratings_sum / self.total_ratings
        self.save()

    class Meta:
        verbose_name = 'Mentores/Aprendices'
        verbose_name_plural = 'Mentores/Aprendices'

class Availability(models.Model):
    mentor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'is_staff': True})
    mentor_name = models.CharField(max_length=255)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    link = models.URLField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.date} {self.start_time} - {self.end_time} with {self.mentor.full_name}"
    
    class Meta:
        verbose_name = 'Citas disponibles'
        verbose_name_plural = 'Citas disponibles'
    
    @property
    def mentor_info(self):
        return self.mentor.mentoring
    
class Session(models.Model):
    apprentice = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='apprentice_sessions', limit_choices_to={'is_staff': False})
    availability = models.ForeignKey(Availability, on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    description = models.TextField()
    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.subject} - {self.apprentice.full_name} with {self.availability.mentor.full_name}"

    class Meta:
        ordering = ['availability__date']
        verbose_name = 'Sesión'
        verbose_name_plural = 'Sesiones'