from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models, transaction
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, document, email, full_name, password=None, **extra_fields):
        if not document:
            raise ValueError('El campo Documento debe ser establecido')
        if not email:
            raise ValueError('El campo Email debe ser establecido')
        if not document.isdigit():
            raise ValueError('El campo Documento debe ser numérico')
        email = self.normalize_email(email)
        user = self.model(document=document, email=email, full_name=full_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    @transaction.atomic
    def create_superuser(self, document, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        # Crear el superusuario
        user = self.create_user(document, email, full_name, password, **extra_fields)
        from mentoring.models import Mentoring
        Mentoring.objects.create(user=user, is_mentor=True)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    document = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'document'
    REQUIRED_FIELDS = ['email', 'full_name']

    def clean(self):
        if not self.document.isdigit():
            raise ValidationError('El campo Documento debe ser numérico')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    identification_type = models.CharField(max_length=50)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20)
    ethnic_group = models.CharField(max_length=50)
    disability = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=20)
    highest_education_level = models.CharField(max_length=50)
    company_type = models.CharField(max_length=100)
    company_name = models.CharField(max_length=255)
    company_nit = models.CharField(max_length=50)
    previous_business = models.CharField(max_length=10)
    operation_start_year = models.DateField(null=True, blank=True)
    registered_in_ccc = models.CharField(max_length=255)
    main_office_department = models.CharField(max_length=100)
    main_office_municipality = models.CharField(max_length=100)
    business_sector = models.CharField(max_length=100)
    product_type = models.CharField(max_length=100)
    client_focus = models.CharField(max_length=100)
    market_reach = models.CharField(max_length=100)
    business_size = models.CharField(max_length=100)
    data_consent = models.BooleanField(default=False)

    def __str__(self):
        return f'Perfil de {self.user.full_name}'

    class Meta:
        verbose_name = 'Perfil de Usuario'
        verbose_name_plural = 'Perfiles de Usuarios'