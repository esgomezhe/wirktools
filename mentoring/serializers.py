from rest_framework import serializers
from .models import Availability, Session, Mentoring
from forms.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class MentorInfoSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Mentoring
        fields = ['about', 'rating', 'categories']

    def get_categories(self, obj):
        return [{"id": category.id, "name": category.name, "slug": category.slug} for category in obj.categories.all()]
    
class MentorAboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mentoring
        fields = ['about']

class MentorCategoriesSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Category.objects.all()
    )

    class Meta:
        model = Mentoring
        fields = ['categories']

class AvailabilitySerializer(serializers.ModelSerializer):
    mentor_name = serializers.CharField(source='mentor.full_name', read_only=True)
    mentor_info = MentorInfoSerializer(source='mentor.mentoring', read_only=True)

    class Meta:
        model = Availability
        fields = ['id', 'mentor', 'mentor_name', 'mentor_info', 'date', 'start_time', 'end_time', 'link']

class SessionSerializer(serializers.ModelSerializer):
    apprentice_full_name = serializers.CharField(source='apprentice.full_name', read_only=True)
    mentor_full_name = serializers.CharField(source='availability.mentor.full_name', read_only=True)
    mentor_id = serializers.IntegerField(source='availability.mentor.id', read_only=True)
    date = serializers.DateField(source='availability.date', read_only=True)
    start_time = serializers.TimeField(source='availability.start_time', read_only=True)
    end_time = serializers.TimeField(source='availability.end_time', read_only=True)
    link = serializers.CharField(source='availability.link', read_only=True)

    class Meta:
        model = Session
        fields = ['id', 'subject', 'description', 'link','is_confirmed', 'apprentice_full_name', 'mentor_full_name', 'mentor_id', 'date', 'start_time', 'end_time']	