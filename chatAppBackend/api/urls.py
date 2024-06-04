from django.urls import path
from .views import RoomView, apiHome, UserView
from . import views

urlpatterns = [
    path('', apiHome),
    path('room/', RoomView.as_view()),
    path('user/', UserView.as_view()),
    path('signup/', views.signupPage, name="signup")
]