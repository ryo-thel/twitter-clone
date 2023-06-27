from django.urls import path
from .views import UserList, Activate

urlpatterns = [
    path('users/', UserList.as_view()),
]