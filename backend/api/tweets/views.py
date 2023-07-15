from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import RetrieveModelMixin, DestroyModelMixin, UpdateModelMixin
from .models import Tweet
from .serializers import TweetSerializer


class TweetListCreateView(ListCreateAPIView):
    queryset = Tweet.objects.all()
    permission_classes = (IsAuthenticated,)


class TweetDeleteView(RetrieveModelMixin, DestroyModelMixin, GenericAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class TweetDetailView(RetrieveModelMixin, UpdateModelMixin, GenericAPIView):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)