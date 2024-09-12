from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.db import models, transaction
from django.core.exceptions import ValidationError

class UserManager(BaseUserManager):
    def create_user(self, document, email, full_name, password=None, **extra_fields):
        if not document:
            raise ValueError('The Document field must be set')
        if not email:
            raise ValueError('The Email field must be set')
        if not document.isdigit():
            raise ValueError('The Document field must be numeric')
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
            raise ValidationError('The Document field must be numeric')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'