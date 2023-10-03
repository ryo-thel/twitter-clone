from rest_framework import serializers
from django.contrib.auth import get_user_model
from djoser.serializers import UserSerializer, UserCreateSerializer, UserCreatePasswordRetypeSerializer

User = get_user_model()


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'joined_at')

class CustomUserCreatePasswordRetypeSerializer(UserCreatePasswordRetypeSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

# serializers.py
from rest_framework import serializers
from django.core import validators
from .models import UserProfile

class ProfileSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['icon', 'account_name', 'bio']
    
    icon = serializers.ImageField(
        required=False,
        validators=[
            validators.FileExtensionValidator(
                allowed_extensions=['jpg', 'jpeg', 'png'],
                message='Invalid file type. Supported file types are .jpg, .jpeg, .png'
            )
        ],
        error_messages={
            'required': 'Profile image is required.',
            'invalid_image': 'Upload a valid image.',
            'max_size': 'Uploaded image is too large.'
        }
    )
    account_name = serializers.CharField(
        required=True,
        max_length=255,
        validators=[
            validators.MinLengthValidator(
                limit_value=3,
                message='Account name must have at least 3 characters.'
            )
        ],
        error_messages={
            'required': 'Account name is required.',
            'unique': 'This account name is already taken.',
            'max_length': 'Account name cannot exceed 255 characters.'
        }
    )
    bio = serializers.CharField(
        required=False,
        max_length=255,
        error_messages={
            'max_length': 'Bio cannot exceed 255 characters.'
        }
    )
    
    def validate_account_name(self, value):
        if UserProfile.objects.filter(account_name=value).exists():
            raise serializers.ValidationError('This account name is already taken.')
        return value
