import nested_admin
from django.contrib import admin
from .models import Form, Question, Answer, CompletedForm, Category, Diagnostics, DiagnosticLevel, CategoryDiagnostics

admin.site.register(Category)

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

class FormAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuestionInline]

admin.site.register(Form, FormAdmin)

@admin.register(CompletedForm)
class CompletedFormAdmin(admin.ModelAdmin):
    list_display = ['form_title', 'user', 'created_at']
    readonly_fields = ['content']  # Si deseas que el contenido sea de solo lectura

class DiagnosticLevelInline(nested_admin.NestedStackedInline):
    model = DiagnosticLevel
    extra = 0

class CategoryDiagnosticsInline(nested_admin.NestedStackedInline):
    model = CategoryDiagnostics
    inlines = [DiagnosticLevelInline]
    extra = 0

class DiagnosticsAdmin(nested_admin.NestedModelAdmin):
    inlines = [CategoryDiagnosticsInline]

admin.site.register(Diagnostics, DiagnosticsAdmin)