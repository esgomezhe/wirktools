# Generated by Django 5.0.2 on 2024-08-30 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentoring', '0013_remove_availability_about_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='availability',
            name='mentor_name',
            field=models.CharField(default='Esteban Gomez', max_length=255),
            preserve_default=False,
        ),
    ]
