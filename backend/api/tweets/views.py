from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Tweet

class TweetListCreateView(ListCreateAPIView):
    queryset = Tweet.objects.all()
    permission_classes = (IsAuthenticated,)
