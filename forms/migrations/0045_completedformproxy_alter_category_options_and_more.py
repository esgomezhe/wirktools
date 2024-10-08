# Generated by Django 5.0.2 on 2024-08-29 17:27

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
                'verbose_name': 'Descarga la Base de Datos Completa',
                'verbose_name_plural': 'Descarga la Base de Datos Completa',
                'proxy': True,
                'indexes': [],
                'constraints': [],
            },
            bases=('forms.completedform',),
        ),
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Categoría', 'verbose_name_plural': 'Categorías'},
        ),
        migrations.AlterModelOptions(
            name='completedform',
            options={'verbose_name': 'Formulario Completado', 'verbose_name_plural': 'Formularios Completados'},
        ),
        migrations.AlterModelOptions(
            name='form',
            options={'verbose_name': 'Formulario', 'verbose_name_plural': 'Formularios'},
        ),
    ]
