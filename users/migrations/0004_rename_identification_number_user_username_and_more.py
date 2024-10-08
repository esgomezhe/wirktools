# Generated by Django 5.0.2 on 2024-08-06 18:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_birth_date_alter_user_first_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='identification_number',
            new_name='username',
        ),
        migrations.RemoveField(
            model_name='user',
            name='birth_date',
        ),
        migrations.RemoveField(
            model_name='user',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='identification_type',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_number',
        ),
    ]
