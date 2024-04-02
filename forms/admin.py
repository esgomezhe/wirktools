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

    info_questions = {
        "userName": "Nombre",
        "companyType": "Tipo de Empresa",
        "identificationType": "Tipo de Documento",
        "identificationNumber": "Número de Identificación",
        "birthDate": "Fecha de Nacimiento",
        "gender": "Género",
        "ethnicGroup": "Grupo Étnico",
        "disability": "Discapacidad",
        "email": "Correo Electrónico",
        "phoneNumber": "Teléfono",
        "highestEducationLevel": "Nivel Educativo Máximo"
    }

    for obj in queryset:
        user = obj.user
        form_title = obj.form_title
        created_at = obj.created_at.strftime("%Y-%m-%d %H:%M:%S")

        # Primero, exporta la información de 'info'
        info_data = obj.content.get('info', {})
        for key, question in info_questions.items():
            answer_text = info_data.get(key, "")
            writer.writerow([user, form_title, created_at, "Caracterización", question, answer_text])

        # Luego, exporta las respuestas de 'answers'
        for ans in obj.content.get('answers', []):
            category_name = ans['category']['name']
            question_text = ans['questionText']
            answer_text = ans['answerText']
            writer.writerow([user, form_title, created_at, category_name, question_text, answer_text])

    return response

@admin.action(description='Exportar seleccionados a Excel')
def export_as_excel(modeladmin, request, queryset):
    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    response['Content-Disposition'] = 'attachment; filename=completed_forms.xlsx'
    wb = openpyxl.Workbook()
    ws = wb.active

    # Encabezados de la hoja de Excel
    ws.append(['User', 'Form Title', 'Created At', 'Category Name', 'Question Text', 'Answer Text'])

    # Mapeo de los campos 'info' a preguntas legibles
    info_questions = {
        "userName": "Nombre",
        "companyType": "Tipo de Empresa",
        "identificationType": "Tipo de Documento",
        "identificationNumber": "Número de Identificación",
        "birthDate": "Fecha de Nacimiento",
        "gender": "Género",
        "ethnicGroup": "Grupo Étnico",
        "disability": "Discapacidad",
        "email": "Correo Electrónico",
        "phoneNumber": "Teléfono",
        "highestEducationLevel": "Nivel Educativo Máximo",
        "companyName": "Nombre de Empresa",
        "companyNIT": "NIT de Empresa",
        "previousBusiness": "¿Ha creado otra empresa anteriormente?",
        "operationStartYear": "Año de Inicio de Operaciones",
        "registeredInCCC": "Registrado en CCC",
        "mainOfficeDepartment": "Departamento de la Sede Principal",
        "mainOfficeMunicipality": "Municipio de la Sede Principal",
        "businessSector": "Sector Principal de la Empresa",
        "productType": "Tipo de Productos/Servicios Ofrecidos",
        "clientFocus": "Enfoque del Cliente",
        "marketReach": "Alcance del Mercado",
        "businessSize": "Tamaño de la Empresa",
    }

    for obj in queryset:
        user = obj.user
        form_title = obj.form_title
        created_at = obj.created_at.strftime("%Y-%m-%d %H:%M:%S")

        # Exporta los datos de 'info' como si fueran respuestas adicionales
        info_data = obj.content.get('info', {})
        for key, question in info_questions.items():
            answer_text = info_data.get(key, "N/A")
            ws.append([user, form_title, created_at, "Caracterización", question, answer_text])

        # Exporta las respuestas estándar de 'answers'
        for ans in obj.content.get('answers', []):
            category_name = ans.get('category', {}).get('name', 'N/A')
            question_text = ans.get('questionText', 'N/A')
            answer_text = ans.get('answerText', 'N/A')
            ws.append([user, form_title, created_at, category_name, question_text, answer_text])

    for column_cells in ws.columns:
        length = max(len(str(cell.value)) for cell in column_cells if cell.value)
        ws.column_dimensions[column_cells[0].column_letter].width = length

    wb.save(response)
    return response

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'email','created_at']
    readonly_fields = ('user', 'email', 'form_title', 'created_at', 'content_pretty')
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