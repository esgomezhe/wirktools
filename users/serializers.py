from rest_framework import serializers
from .models import User, UserProfile
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

class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    document = serializers.CharField(source='user.document', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'user_id',
            'full_name',
            'email',
            'document',
            'identification_type',
            'birth_date',
            'gender',
            'ethnic_group',
            'disability',
            'phone_number',
            'highest_education_level',
            'company_type',
            'company_name',
            'company_nit',
            'previous_business',
            'operation_start_year',
            'registered_in_ccc',
            'main_office_department',
            'main_office_municipality',
            'business_sector',
            'product_type',
            'client_focus',
            'market_reach',
            'business_size',
            'data_consent',
        ]

    def update(self, instance, validated_data):
        # Actualizar los campos del perfil de usuario
        for attr, value in validated_data.items():
            if attr == 'user':
                continue  # No actualizar el usuario desde aquí
            setattr(instance, attr, value)
        instance.save()
        return instance