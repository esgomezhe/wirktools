from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

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

def send_diagnostic_email(to_email, subject, context):
    html_message = render_to_string('diagnostic_email.html', context)
    plain_message = strip_tags(html_message)
    from_email = 'autodiagnostico@transformaciondigital.com.co'
    
    send_mail(subject, plain_message, from_email, [to_email], html_message=html_message)

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