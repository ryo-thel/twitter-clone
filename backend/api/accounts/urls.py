from django.urls import path
from .views import UserList, JWTokenObtainView, JWTokenRefreshView, LogoutView, get_csrf_token

urlpatterns = [
    path('users/', UserList.as_view()),
    path('auth/jwt/create/', JWTokenObtainView.as_view()),
    path('auth/jwt/refresh/', JWTokenRefreshView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('csrf/get/', get_csrf_token),
]