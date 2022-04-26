from rest_framework import serializers
from .models import Ratings, Artists

class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ratings
        fields = ('id', 'username', 'song', 'rating')

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ('artist', 'song', 'trackId')