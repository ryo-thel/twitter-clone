from django.urls import path
from .views import UserList, JWTokenObtainView

urlpatterns = [
    path('users/', UserList.as_view()),
    path('auth/jwt/create/', JWTokenObtainView.as_view()),
]
