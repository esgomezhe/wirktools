# Generated by Django 5.0.2 on 2024-03-20 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0029_alter_completedform_form_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='completedform',
            name='form_title',
            field=models.CharField(max_length=255),
        ),
    ]
