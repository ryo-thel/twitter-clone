from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid


class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError('ユーザー名は必須です!')
        if not email:
            raise ValueError('メールアドレスは必須です!')

        email = self.normalize_email(email)
        email = email.lower()
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        user = self.create_user(username, email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField("ID", primary_key = True, default=uuid.uuid4, editable=False)
    username = models.CharField("名前", max_length=255, unique=True)
    email = models.EmailField("メールアドレス", max_length=255, unique=True)
    joined_at = models.DateTimeField(verbose_name="登録日時", auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
    

from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator

class UserProfile(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE, related_name='profile')
    icon = models.ImageField(
        upload_to='avatars/', 
        validators=[
            FileExtensionValidator(
                allowed_extensions=['jpg', 'jpeg', 'png'],
                message='Invalid file type. Supported file types are .jpg, .jpeg, .png'
            )
        ],
        verbose_name='Profile Image'
    )
    account_name = models.CharField(
        max_length=255, 
        unique=True, 
        verbose_name='Account Name'
    )
    bio = models.TextField(
        max_length=1000, 
        blank=True, 
        verbose_name='Bio'
    )

    def __str__(self):
        return self.account_name

    