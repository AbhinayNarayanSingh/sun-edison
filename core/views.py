from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.utils.translation import gettext, gettext_lazy as _


from rest_framework.decorators import api_view
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets

from .serializers import *

app_name = 'core'


@api_view(['GET'])          
def getFile(request,pk):
    query = File.objects.filter(user=pk)
    serializer = FileSerializer(query, many=True)
    return Response(serializer.data)


@api_view(['GET'])          
def accessFile(request, pk):
    query = File.objects.filter(access=pk)

    serializer = FileSerializer(query, many=True)
    return Response(serializer.data)




class FileAPIView(APIView):
    serializer_class = FileSerializer
    
    def get(self, request,pk, *args, **kwargs):
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
            modifier = data['modifier'], 
        )
        new_file.save()

        serializer = FileSerializer(new_file)

        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        query = File.objects.get(pk=pk)
        query.delete()
        return Response("File Deleted")





