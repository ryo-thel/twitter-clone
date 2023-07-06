from django.urls import path
from .views import UserList, JWTokenObtainView, JWTokenRefreshView

urlpatterns = [
    path('users/', UserList.as_view()),
    path('auth/jwt/create/', JWTokenObtainView.as_view()),
    path('auth/jwt/refresh', JWTokenRefreshView.as_view(),)
]