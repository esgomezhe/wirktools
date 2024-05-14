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

def get_ordered_answer_questions(forms):
    first_obj_answers = forms[0].content.get('answers', [])
    ordered_answer_questions = []
    seen_questions = set()
    for ans in first_obj_answers:
        question_text = ans['questionText']
        if question_text not in seen_questions:
            ordered_answer_questions.append(question_text)
            seen_questions.add(question_text)
    return ordered_answer_questions

def find_plan_for_score(score, levels):
    if score < 2:
        level_needed = 1
    elif score < 3:
        level_needed = 2
    elif score < 4:
        level_needed = 3
    else:
        level_needed = 4

    level = next((level for level in levels if level['level'] == level_needed), None)
    return ', '.join(plan['text'] for plan in level['plans']) if level else 'No hay planes para este nivel'

def calculate_category_averages(answers):
    category_scores = {}
    category_counts = {}
    total_answers_count = 0
    categories_details = {}

    for answer in answers:
        category, value, answers_count = answer['category'], answer['value'], answer['answers_count']
        total_answers_count += answers_count
        
        if category['name'] == 'Complejidad':
            continue

        category_name = category['name']

        if category_name in category_scores:
            category_scores[category_name] += value
            category_counts[category_name] += 1
        else:
            category_scores[category_name] = value
            category_counts[category_name] = 1
            categories_details[category_name] = category

    average_answers_count = total_answers_count / len(answers)
    max_response_value = max(average_answers_count, 5)

    category_averages = []
    for category_name in category_scores:
        average = category_scores[category_name] / category_counts[category_name]
        normalized_average = (average / max_response_value) * 5
        category = categories_details[category_name]
        plan_to_show = find_plan_for_score(normalized_average, category['levels'])
        category_averages.append({
            'category': category,
            'average': normalized_average,
            'plan': plan_to_show
        })

    return category_averages

def build_row(obj, ordered_answer_questions, category_averages):
    row = [obj.user, obj.form_title, obj.created_at.strftime("%Y-%m-%d %H:%M:%S")]
    info_data = obj.content.get('info', {})
    for key in info_questions:
        row.append(info_data.get(key, "N/A"))
    answers_data = {ans['questionText']: ans.get('value', 'N/A') for ans in obj.content.get('answers', [])}
    for question in ordered_answer_questions:
        row.append(answers_data.get(question, "N/A"))
    for avg in category_averages:
        row.append(avg['plan'])
    return row

@admin.action(description='Exportar seleccionados a CSV')
def export_as_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=completed_forms.csv'
    writer = csv.writer(response)

    if not queryset.exists():
        writer.writerow(['No hay datos para mostrar.'])
        return response

    forms_by_title = {}
    for obj in queryset:
        forms_by_title.setdefault(obj.form_title, []).append(obj)

    for form_title, forms in forms_by_title.items():
        writer.writerow([form_title])
        ordered_answer_questions = get_ordered_answer_questions(forms)
        category_averages = calculate_category_averages(forms[0].content.get('answers', []))
        headers = ['User', 'Form Title', 'Created At'] + list(info_questions.values()) + ordered_answer_questions
        headers += [f"Autodiagnóstico {avg['category']['name']}" for avg in category_averages]
        writer.writerow(headers)

        for obj in forms:
            row = build_row(obj, ordered_answer_questions, category_averages)
            writer.writerow(row)

    return response

@admin.action(description='Exportar seleccionados a Excel')
def export_as_excel(modeladmin, request, queryset):
    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    response['Content-Disposition'] = 'attachment; filename=completed_forms.xlsx'
    wb = openpyxl.Workbook()

    if not queryset.exists():
        ws = wb.active
        ws.append(['No hay datos para mostrar.'])
        wb.save(response)
        return response

    forms_by_title = {}
    for obj in queryset:
        forms_by_title.setdefault(obj.form_title, []).append(obj)

    for form_title, forms in forms_by_title.items():
        ws = wb.create_sheet(title=form_title[:31])
        ordered_answer_questions = get_ordered_answer_questions(forms)
        category_averages = calculate_category_averages(forms[0].content.get('answers', []))
        headers = ['User', 'Form Title', 'Created At'] + list(info_questions.values()) + ordered_answer_questions
        headers += [f"Autodiagnóstico {avg['category']['name']}" for avg in category_averages]
        ws.append(headers)

        for obj in forms:
            row = build_row(obj, ordered_answer_questions, category_averages)
            ws.append(row)

        for column in ws.columns:
            max_length = max(len(str(cell.value)) for cell in column)
            adjusted_width = (max_length + 2)
            ws.column_dimensions[column[0].column_letter].width = adjusted_width

    if 'Sheet' in wb.sheetnames:
        del wb['Sheet']

    wb.save(response)
    return response

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'email','created_at']
    readonly_fields = ('user', 'email', 'form_title', 'created_at', 'content_pretty')
    actions = [export_as_csv, export_as_excel]

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