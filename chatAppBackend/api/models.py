from django.db import models
from django.contrib.auth.models import AbstractUser
import string, random


def unique_code_gen():
    len = 8

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k = len))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

class User(AbstractUser):
    
    username = models.CharField(max_length=200, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255, null=False)

    # avatar = models.ImageField(null=True, default="avatar.svg")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

class Room(models.Model):
    code = models.CharField(max_length=8,default='', unique=True)
    created_at =models.DateTimeField(auto_now_add=True)

