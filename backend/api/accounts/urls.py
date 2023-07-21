from django.urls import path
from .views import UserList, JWTokenObtainView, JWTokenRefreshView, JWTokenVerifyView, LogoutView, get_csrf_token

urlpatterns = [
    path('users/', UserList.as_view()),
    path('auth/jwt/create/', JWTokenObtainView.as_view()),
    path('auth/jwt/refresh/', JWTokenRefreshView.as_view()),
    path('auth/jwt/verify/', JWTokenVerifyView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('get/csrf/', get_csrf_token),
]
