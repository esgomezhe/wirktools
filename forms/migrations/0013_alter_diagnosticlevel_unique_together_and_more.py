# Generated by Django 5.0.2 on 2024-02-28 02:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forms', '0012_diagnosis_diagnosticlevel'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='diagnosticlevel',
            unique_together=set(),
        ),
        migrations.CreateModel(
            name='CategoryDiagnosis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.category')),
                ('diagnosis', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='forms.diagnosis')),
            ],
            options={
                'verbose_name_plural': 'Category Diagnoses',
                'unique_together': {('category', 'diagnosis')},
            },
        ),
        migrations.AddField(
            model_name='diagnosticlevel',
            name='category_diagnosis',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='levels', to='forms.categorydiagnosis'),
        ),
        migrations.RemoveField(
            model_name='diagnosticlevel',
            name='category',
        ),
        migrations.RemoveField(
            model_name='diagnosticlevel',
            name='diagnosis',
        ),
    ]
