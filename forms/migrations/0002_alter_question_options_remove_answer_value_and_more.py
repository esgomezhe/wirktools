# Generated by Django 5.0.2 on 2024-02-25 00:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={},
        ),
        migrations.RemoveField(
            model_name='answer',
            name='value',
        ),
        migrations.RemoveField(
            model_name='question',
            name='category',
        ),
        migrations.RemoveField(
            model_name='question',
            name='order',
        ),
        migrations.DeleteModel(
            name='UserAnswer',
        ),
    ]
