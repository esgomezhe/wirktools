# Generated by Django 5.0.2 on 2024-08-08 16:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('mentoring', '0002_remove_mentee_user_remove_mentor_user_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Mentoring',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_mentor', models.BooleanField(default=False)),
                ('is_apprentice', models.BooleanField(default=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': [('can_be_mentor', 'Can be a mentor'), ('can_be_apprentice', 'Can be an apprentice')],
            },
        ),
    ]
