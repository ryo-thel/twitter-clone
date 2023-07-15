from django.urls import path
from .views import TweetListCreateView, TweetDeleteView, TweetDetailView

urlpatterns = [
  path('', TweetListCreateView.as_view()),
  path('', TweetDeleteView.as_view()),
  path('', TweetDetailView.as_view()),
]
