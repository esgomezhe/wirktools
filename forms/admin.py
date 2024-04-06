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

    if not queryset.exists():
        writer.writerow(['No hay datos para mostrar.'])
        return response

    # Usar las preguntas de 'answers' del primer objeto para definir el orden
    first_obj_answers = queryset.first().content.get('answers', [])
    ordered_answer_questions = [ans['questionText'] for ans in first_obj_answers]

    # Construir cabeceras
    headers = ['User', 'Form Title', 'Created At'] + list(info_questions.values()) + ordered_answer_questions
    writer.writerow(headers)

    # Construcción de cada fila considerando el orden de 'answers'
    for obj in queryset:
        row = [obj.user, obj.form_title, obj.created_at.strftime("%Y-%m-%d %H:%M:%S")]

        # Añadir datos de 'info'
        info_data = obj.content.get('info', {})
        for key in info_questions:
            row.append(info_data.get(key, "N/A"))

        # Preparar y añadir datos de 'answers' según el orden establecido
        answers_data = {ans['questionText']: ans.get('value', 'N/A') for ans in obj.content.get('answers', [])}
        for question in ordered_answer_questions:
            row.append(answers_data.get(question, "N/A"))

        writer.writerow(row)

    return response

@admin.action(description='Exportar seleccionados a Excel')
def export_as_excel(modeladmin, request, queryset):
    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    response['Content-Disposition'] = 'attachment; filename=completed_forms.xlsx'
    wb = openpyxl.Workbook()
    ws = wb.active

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

    if not queryset.exists():
        ws.append(['No hay datos para mostrar.'])
        wb.save(response)
        return response

    # Usar las preguntas de 'answers' del primer objeto para definir el orden
    first_obj_answers = queryset.first().content.get('answers', [])
    ordered_answer_questions = [ans['questionText'] for ans in first_obj_answers]

    # Construir cabeceras
    headers = ['User', 'Form Title', 'Created At'] + list(info_questions.values()) + ordered_answer_questions
    ws.append(headers)

    # Construcción de cada fila considerando el orden de 'answers'
    for obj in queryset:
        row = [obj.user, obj.form_title, obj.created_at.strftime("%Y-%m-%d %H:%M:%S")]

        # Añadir datos de 'info'
        info_data = obj.content.get('info', {})
        for key in info_questions.keys():
            row.append(info_data.get(key, "N/A"))

        # Preparar y añadir datos de 'answers' según el orden establecido
        answers_data = {ans['questionText']: ans.get('value', 'N/A') for ans in obj.content.get('answers', [])}
        for question in ordered_answer_questions:
            row.append(answers_data.get(question, "N/A"))

        ws.append(row)
    # Ajustar el ancho de las columnas
    for column in ws.columns:
        max_length = max(len(str(cell.value)) for cell in column)
        adjusted_width = (max_length + 2)
        ws.column_dimensions[column[0].column_letter].width = adjusted_width

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