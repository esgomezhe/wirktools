import nested_admin
import os
from django.contrib import admin
from django.utils.html import format_html
from django.urls import path
from django.http import FileResponse, HttpResponseRedirect
from django.conf import settings
from django.contrib import messages
from .models import *
from .utils import export_as_excel, export_as_csv

class DiagnosticPlanInline(nested_admin.NestedStackedInline):
    model = DiagnosticPlan
    extra = 0

class DiagnosticLevelInline(nested_admin.NestedStackedInline):
    model = DiagnosticLevel
    inlines = [DiagnosticPlanInline]
    extra = 0

@admin.register(Category)
class CategoryAdmin(nested_admin.NestedModelAdmin):
    inlines = [DiagnosticLevelInline]

class AnswerInline(nested_admin.NestedStackedInline):
    model = Answer
    extra = 0

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        field = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name == 'value':
            field.widget.attrs['min'] = 0
            field.help_text = 'Value for graphics'
        return field

class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    inlines = [AnswerInline]
    extra = 0

@admin.register(Form)
class FormAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline]

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'email', 'created_at']
    readonly_fields = ('user', 'email', 'form_title', 'created_at', 'content_pretty')
    actions = ['export_as_csv_action', 'export_as_excel_action']

    def content_pretty(self, instance):
        answers = instance.content.get('answers', [])
        html = "<table><tr><th>Question</th><th>Category</th><th>Answer</th></tr>"
        for answer in answers:
            question_text = answer.get('questionText', 'N/A')
            category_name = answer.get('category', {}).get('name', 'N/A')
            answer_text = answer.get('answerText', 'N/A')
            html += f"<tr><td>{question_text}</td><td>{category_name}</td><td>{answer_text}</td></tr>"
        html += "</table>"
        return format_html(html)

    def export_as_csv_action(self, request, queryset):
        return export_as_csv(queryset)

    export_as_csv_action.short_description = 'Exportar seleccionados a CSV'

    def export_as_excel_action(self, request, queryset):
        return export_as_excel(queryset)

    export_as_excel_action.short_description = 'Exportar seleccionados a Excel'

@admin.register(CompletedFormProxy)
class ExcelDownloadAdmin(admin.ModelAdmin):
    change_list_template = None  # No utilizar plantilla personalizada

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('download_excel/', self.admin_site.admin_view(self.download_excel), name='download_excel'),
        ]
        return custom_urls + urls

    def download_excel(self, request):
        file_path = os.path.join(settings.MEDIA_ROOT, 'completed_forms.xlsx')
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='completed_forms.xlsx')
        else:
            messages.error(request, "El archivo no existe.")
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

    def changelist_view(self, request, extra_context=None):
        return self.download_excel(request)

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_view_permission(self, request, obj=None):
        return True

@admin.register(UserProfileProxy)
class UserProfileProxyAdmin(admin.ModelAdmin):
    list_display = ['document', 'full_name', 'email', 'has_complete_profile', 'has_completed_form']
    search_fields = ['user__document', 'user__full_name', 'user__email']

    def document(self, obj):
        return obj.user.document
    document.admin_order_field = 'user__document'
    document.short_description = 'Documento'

    def full_name(self, obj):
        return obj.user.full_name
    full_name.admin_order_field = 'user__full_name'
    full_name.short_description = 'Nombre Completo'

    def email(self, obj):
        return obj.user.email
    email.admin_order_field = 'user__email'
    email.short_description = 'Email'

    def has_complete_profile(self, obj):
        # Verificar si el usuario tiene un perfil completo
        return True
    has_complete_profile.boolean = True
    has_complete_profile.short_description = 'Caracterización'

    def has_completed_form(self, obj):
        # Verificar si el usuario tiene formularios completados
        document_number = obj.user.document
        return CompletedForm.objects.filter(content__info__document=document_number).exists()
    has_completed_form.boolean = True
    has_completed_form.short_description = 'Diagnóstico'
    
    def has_change_permission(self, request, obj=None):
        return False