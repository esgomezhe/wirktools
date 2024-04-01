import nested_admin
import openpyxl
import csv
from django.contrib import admin
from .models import Form, Question, Answer, CompletedForm, Category, DiagnosticLevel, DiagnosticPlan
from django.utils.html import format_html
from django.http import HttpResponse

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
            field.widget.attrs['min'] = 0  # Por ejemplo, si quieres que el valor sea siempre positivo
            field.help_text = 'Value for graphics'  # Añade una descripción al campo
        return field

class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    inlines = [AnswerInline]
    extra = 0

@admin.register(Form)
class FormAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline]

@admin.action(description='Exportar seleccionados a CSV')
def export_as_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=completed_forms.csv'
    writer = csv.writer(response)
    writer.writerow(['User', 'Form Title', 'Created At', 'Category Name', 'Question Text', 'Answer Text'])

    for obj in queryset:
        user = obj.user.username if obj.user else "Anonymous"
        form_title = obj.form_title
        created_at = obj.created_at.strftime("%Y-%m-%d %H:%M:%S")
        for ans in obj.content.get('answers', []):
            category_name = ans['category']['name']
            question_text = ans['questionText']
            answer_text = ans['answerText']
            writer.writerow([user, form_title, created_at, category_name, question_text, answer_text])

    return response

@admin.action(description='Exportar seleccionados a Excel')
def export_as_excel(modeladmin, request, queryset):
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',)
    response['Content-Disposition'] = 'attachment; filename=completed_forms.xlsx'
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append(['User', 'Form Title', 'Created At', 'Category Name', 'Question Text', 'Answer Text'])

    for obj in queryset:
        user = obj.user.username if obj.user else "Anonymous"
        form_title = obj.form_title
        created_at = obj.created_at.strftime("%Y-%m-%d %H:%M:%S")
        for ans in obj.content.get('answers', []):
            category_name = ans['category']['name']
            question_text = ans['questionText']
            answer_text = ans['answerText']
            ws.append([user, form_title, created_at, category_name, question_text, answer_text])

    wb.save(response)
    return response

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'created_at']
    readonly_fields = ('user', 'form_title', 'created_at', 'content_pretty')
    actions = [export_as_csv, export_as_excel]

    def content_pretty(self, instance):
        # Extrae la sección 'answers' del JSON almacenado en 'content'
        answers = instance.content.get('answers', [])
        # Inicia la construcción de la tabla HTML
        html = "<table>"
        # Agrega encabezados a la tabla
        html += "<tr><th>Question</th><th>Category</th><th>Answer</th></tr>"
        for answer in answers:
            question_text = answer.get('questionText', 'N/A')
            category_name = answer.get('category', {}).get('name', 'N/A')
            answer_text = answer.get('answerText', 'N/A')
            html += f"<tr><td>{question_text}</td><td>{category_name}</td><td>{answer_text}</td></tr>"
        html += "</table>"
        return format_html(html)