from django.contrib import admin
from .models import Mentoring, Availability, Session

class MentoringAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_mentor', 'is_apprentice')
    list_filter = ('is_mentor', 'is_apprentice')
    search_fields = ('user__document', 'user__email', 'user__full_name')

admin.site.register(Mentoring, MentoringAdmin)

class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('mentor', 'date', 'start_time', 'end_time', 'link')
    list_filter = ('date', 'mentor')
    search_fields = ('mentor__document', 'mentor__email', 'mentor__full_name')

admin.site.register(Availability, AvailabilityAdmin)

class SessionAdmin(admin.ModelAdmin):
    list_display = ('apprentice', 'availability', 'subject', 'is_confirmed')
    list_filter = ('is_confirmed', 'availability__mentor')
    search_fields = ('apprentice__document', 'apprentice__email', 'apprentice__full_name', 'subject')

admin.site.register(Session, SessionAdmin)