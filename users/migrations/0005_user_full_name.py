# Generated by Django 5.0.2 on 2024-08-08 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_rename_identification_number_user_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='full_name',
            field=models.CharField(default='Esteban Gomez', max_length=255),
            preserve_default=False,
        ),
    ]
