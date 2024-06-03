from django.urls import path
from .views import RoomView, apiHome, UserView

urlpatterns = [
    path('', apiHome),
    path('room/', RoomView.as_view()),
    path('user/', UserView.as_view()),
]