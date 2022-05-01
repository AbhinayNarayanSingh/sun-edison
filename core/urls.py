from django.urls import path
from .views import *

app_name = 'core'

urlpatterns = [
    path("file/<int:pk>", FileAPIView.as_view()),
    path("upload/file", FileAPIView.as_view()),
    path("delete/file/<int:pk>", FileAPIView.as_view()),

    path("access-file/<int:pk>", AccessListAPIView.as_view()),
    path("access-file/create/", AccessCreateAPIView.as_view()),

    path("get/all/user/<int:pk>", UserListAPIView.as_view())
]