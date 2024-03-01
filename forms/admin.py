import nested_admin
from django.contrib import admin
from .models import Form, Question, Answer, CompletedForm, Category, DiagnosticLevel, DiagnosticPlan

class DiagnosticPlanInline(nested_admin.NestedStackedInline):
    model = DiagnosticPlan
    extra = 0

class DiagnosticLevelInline(nested_admin.NestedStackedInline):
    model = DiagnosticLevel
    inlines = [DiagnosticPlanInline]
    extra = 0

@admin.register(Category)
class CategoryAdmin(nested_admin.NestedModelAdmin):
    inlines = [DiagnosticLevelInline]

class AnswerInline(nested_admin.NestedStackedInline):
    model = Answer
    extra = 0

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        field = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name == 'value':
            field.widget.attrs['min'] = 0  # Por ejemplo, si quieres que el valor sea siempre positivo
            field.help_text = 'Value for graphics'  # Añade una descripción al campo
        return field

class QuestionInline(nested_admin.NestedStackedInline):
    model = Question
    inlines = [AnswerInline]
    extra = 0

@admin.register(Form)
class FormAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline]

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'created_at']
    readonly_fields = ['content']  # Si deseas que el contenido sea de solo lectura