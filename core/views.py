from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.utils.translation import gettext, gettext_lazy as _


from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import AccessSerializer, FileSerializer
from user.serializers import UserSerializer

from .models import Access, File

from user.models import User

app_name = 'core'



class UserListAPIView(ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        pk = self.kwargs['pk']
        return User.objects.exclude(pk=pk) 
    


class AccessListAPIView(ListAPIView):
    serializer_class = AccessSerializer

    def get_queryset(self):
        access_to = self.kwargs['pk']
        return Access.objects.filter(accessTo=access_to)


class AccessCreateAPIView(APIView):
    serializer_class = AccessSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        print(data)
 
        new_file = Access.objects.create(
            accessBy = User.objects.get(pk=data['accessBy']),
            accessTo = User.objects.get(pk=data['accessTo']),
            document = File.objects.get(pk=data['document'])
        )
        new_file.save()

        serializer = AccessSerializer(new_file)

        return Response(serializer.data)




class FileAPIView(APIView):
    serializer_class = FileSerializer
    
    def get(self, request, pk, *args, **kwargs):
        query = File.objects.filter(user=pk)
        serializer = FileSerializer(query, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        data = request.data
        user_id = User.objects.get(pk=data['user'])
 
        new_file = File.objects.create(
            user = user_id,
            document = data['document'],
            description = data['description'],
        )
        new_file.save()

        serializer = FileSerializer(new_file)

        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        query = File.objects.get(pk=pk)
        query.delete()
        return Response("File Deleted")





