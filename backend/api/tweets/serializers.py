from rest_framework import serializers
from .models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = "__all__"

    def validate_user(self, value):
        if value != self.context['request'].user:
            raise serializers.ValidationError('Invalid user.')
        return value