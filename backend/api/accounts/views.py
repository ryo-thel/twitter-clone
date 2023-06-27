from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from djoser import utils
from djoser.compat import get_user_email
from djoser.conf import settings

User = get_user_model()


class UserList(ListAPIView):
    queryset = User.objects.filter(is_active=True)
    serializer_class = CustomUserSerializer

