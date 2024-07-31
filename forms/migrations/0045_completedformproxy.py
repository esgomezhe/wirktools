# Generated by Django 5.0.2 on 2024-07-31 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0044_alter_completedform_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompletedFormProxy',
            fields=[
            ],
            options={
                'verbose_name': 'Completed Form Download',
                'verbose_name_plural': 'Completed Form Downloads',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('forms.completedform',),
        ),
    ]
