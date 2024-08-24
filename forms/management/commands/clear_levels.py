from django.core.management.base import BaseCommand
from django.apps import apps
from django.db import transaction

class Command(BaseCommand):
    help = 'Elimina el campo "levels" de las categorías dentro de los formularios completados existentes'

    def handle(self, *args, **kwargs):
        CompletedForm = apps.get_model('forms', 'CompletedForm')
        
        with transaction.atomic():
            for completed_form in CompletedForm.objects.all():
                content = completed_form.content
                if 'answers' in content:
                    for answer in content['answers']:
                        if 'category' in answer and 'levels' in answer['category']:
                            del answer['category']['levels']
                            self.stdout.write(self.style.SUCCESS(f"Removed 'levels' from CompletedForm ID {completed_form.id}"))
                    completed_form.content = content
                    completed_form.save()

        self.stdout.write(self.style.SUCCESS('Todos los formularios completados han sido ajustados correctamente.'))
