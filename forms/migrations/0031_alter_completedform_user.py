# Generated by Django 5.0.2 on 2024-04-01 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0030_alter_completedform_form_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='completedform',
            name='user',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
