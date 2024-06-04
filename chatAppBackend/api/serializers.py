from rest_framework import serializers

from .models import Room, User


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id','code','created_at']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']


