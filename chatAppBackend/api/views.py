# from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from api.models import Room, User
from .serializers import RoomSerializer, UserSerializer
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.http import JsonResponse

def index(request):
    return HttpResponse("in index! go to api/....")

def apiHome(request):
    return HttpResponse("working")

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def signupPage(request):
    # return HttpResponse("here")
    serializer = UserSerializer(data = request.data)
    # return JsonResponse({'req': request.data})
    # return serializer
    if serializer.is_valid():
        # validated_data = serializer._validated_data  # Capture the validated data
        # return JsonResponse({'name': validated_data})  # Use the captured validated data
        serializer.save()  # Save the serializer


        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password']) ################ hash password
        user.save()

        # return JsonResponse({'user' : request.data}) 

        # returns the entered and saved data to frontend in json format
        return Response({'user':serializer.data})
    
    # return HttpResponse("not valid")
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
