from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User

class UserAdmin(BaseUserAdmin):
    list_display = ('document', 'email', 'full_name', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'groups')
    fieldsets = (
        (None, {'fields': ('document', 'email', 'full_name', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('document', 'email', 'full_name', 'password1', 'password2'),
        }),
    )
    search_fields = ('document', 'email')
    ordering = ('document', 'email')

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)