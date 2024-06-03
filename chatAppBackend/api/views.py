# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from api.models import Room, User
from .serializers import RoomSerializer, UserSerializer
from django.http import HttpResponse

def apiHome(request):
    return HttpResponse("working")

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer