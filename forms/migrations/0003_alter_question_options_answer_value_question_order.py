# Generated by Django 5.0.2 on 2024-02-25 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0002_alter_question_options_remove_answer_value_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='question',
            options={'ordering': ['order']},
        ),
        migrations.AddField(
            model_name='answer',
            name='value',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='question',
            name='order',
            field=models.IntegerField(default=0, editable=False),
        ),
    ]
