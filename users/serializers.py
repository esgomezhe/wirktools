from rest_framework import serializers
from .models import User
from mentoring.models import Mentoring

class UserSerializer(serializers.ModelSerializer):
    is_mentor = serializers.SerializerMethodField()
    is_apprentice = serializers.SerializerMethodField()
    about = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'document', 'email', 'full_name', 'is_mentor', 'is_apprentice', 'password', 'about', 'rating', 'categories')
        extra_kwargs = {'password': {'write_only': True}}

    def get_is_mentor(self, obj):
        try:
            mentoring = Mentoring.objects.get(user=obj)
            return mentoring.is_mentor
        except Mentoring.DoesNotExist:
            return False

    def get_is_apprentice(self, obj):
        try:
            mentoring = Mentoring.objects.get(user=obj)
            return mentoring.is_apprentice
        except Mentoring.DoesNotExist:
            return False

    def get_about(self, obj):
        try:
            mentoring = Mentoring.objects.get(user=obj)
            return mentoring.about
        except Mentoring.DoesNotExist:
            return ''
    
    def get_rating(self, obj):
        try:
            mentoring = Mentoring.objects.get(user=obj)
            return mentoring.rating
        except Mentoring.DoesNotExist:
            return 0.0

    def get_categories(self, obj):
        try:
            mentoring = Mentoring.objects.get(user=obj)
            return [{"id": category.id, "name": category.name, "slug": category.slug}
                    for category in mentoring.categories.all()]
        except Mentoring.DoesNotExist:
            return []

    def create(self, validated_data):
        user = User.objects.create_user(
            document=validated_data['document'],
            email=validated_data['email'],
            full_name=validated_data['full_name'],
            password=validated_data['password']
        )
        Mentoring.objects.create(user=user)
        return user