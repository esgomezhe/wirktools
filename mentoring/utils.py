import datetime
from django.core.mail import send_mail
from django.conf import settings
from django.utils.html import strip_tags
import logging
import pytz

def send_mentoring_email(to_emails, subject, context):
    local_tz = pytz.timezone(settings.TIME_ZONE)
    
    # Como 'date' es un objeto datetime.date, no puede tener un método astimezone.
    # Convertimos la fecha y hora combinados en un objeto datetime para manejar zonas horarias si es necesario.
    local_date = context['date']
    local_start_time = context['start_time']
    local_end_time = context['end_time']

    # Convertir las horas en datetime combinadas con la fecha para manejar zonas horarias
    local_start_datetime = datetime.datetime.combine(local_date, local_start_time).astimezone(local_tz)
    local_end_datetime = datetime.datetime.combine(local_date, local_end_time).astimezone(local_tz)

    content_lines = []
    content_lines.append(f"<p>Acción: {context['action']}</p>")
    content_lines.append(f"<p>Mentor: {context['mentor_name']}</p>")
    content_lines.append(f"<p>Aprendiz: {context['apprentice_name']}</p>")
    content_lines.append(f"<p>Fecha: {local_start_datetime.strftime('%Y-%m-%d')}</p>")
    content_lines.append(f"<p>Hora: {local_start_datetime.strftime('%H:%M')} - {local_end_datetime.strftime('%H:%M')}</p>")
    
    if context.get('subject'):
        content_lines.append(f"<p>Asunto: {context['subject']}</p>")
    
    if context.get('description'):
        content_lines.append(f"<p>Descripción: {context['description']}</p>")
    
    email_content = "".join(content_lines)
    plain_message = strip_tags(email_content)
    from_email = settings.DEFAULT_FROM_EMAIL
    
    try:
        send_mail(subject, plain_message, from_email, to_emails, html_message=email_content)
    except Exception as e:
        logging.error(f"Error sending mentoring email: {e}")