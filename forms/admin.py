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
from users.models import UserProfile

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

@admin.register(UserProxy)
class UserProxyAdmin(admin.ModelAdmin):
    list_display = ['document', 'full_name', 'email', 'has_complete_profile', 'has_completed_form']
    search_fields = ['document', 'full_name', 'email']

    def has_complete_profile(self, obj):
        # Verificar si el usuario tiene un perfil completo
        return UserProfile.objects.filter(user=obj).exists()
    has_complete_profile.boolean = True
    has_complete_profile.short_description = 'Caracterización'

    def has_completed_form(self, obj):
        # Verificar si el usuario tiene formularios completados
        return CompletedForm.objects.filter(content__info__document=obj.document).exists()
    has_completed_form.boolean = True
    has_completed_form.short_description = 'Diagnostico'