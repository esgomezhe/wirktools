from django.core.management.base import BaseCommand
from django.apps import apps
from django.db import transaction

class Command(BaseCommand):
    help = 'Actualiza los WorkPlans existentes para que tengan la estructura deseada y para incluir el número de identificación del CompletedForm relacionado'

    def handle(self, *args, **kwargs):
        WorkPlan = apps.get_model('forms', 'WorkPlan')
        CompletedForm = apps.get_model('forms', 'CompletedForm')

        with transaction.atomic():
            # Agrupar WorkPlans por CompletedForm
            work_plans_grouped = {}
            for work_plan in WorkPlan.objects.all():
                completed_form = work_plan.completed_form
                identification_number = completed_form.content.get('info', {}).get('identificationNumber', None)

                if identification_number:
                    work_plan.identification_number = identification_number
                    work_plan.save()

                if completed_form.id not in work_plans_grouped:
                    work_plans_grouped[completed_form.id] = {
                        'id': completed_form.id,
                        'identificationNumber': identification_number,
                        'plans': []
                    }

                work_plans_grouped[completed_form.id]['plans'].append({
                    'category': {
                        'id': work_plan.category.id,
                        'name': work_plan.category.name,
                        'slug': work_plan.category.slug,
                        'plan': work_plan.plan
                    }
                })

            # Mostrar los resultados
            for completed_form_id, data in work_plans_grouped.items():
                self.stdout.write(self.style.SUCCESS(f"CompletedForm ID: {completed_form_id}"))
                self.stdout.write(self.style.SUCCESS(f"Identification Number: {data['identificationNumber']}"))
                for plan in data['plans']:
                    self.stdout.write(self.style.SUCCESS(f"Category: {plan['category']['name']} - Plan: {plan['category']['plan']}"))

        self.stdout.write(self.style.SUCCESS('Todos los WorkPlans han sido actualizados y agrupados correctamente.'))