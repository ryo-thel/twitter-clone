from django.urls import path
from .views import UserList, JWTokenObtainView, JWTokenRefreshView, LogoutView

urlpatterns = [
    path('users/', UserList.as_view()),
    path('auth/jwt/create/', JWTokenObtainView.as_view()),
    path('auth/jwt/refresh/', JWTokenRefreshView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
]