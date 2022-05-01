from rest_framework import serializers
from .models import *
from user.models import User
from user.serializers import UserSerializer

# serializers.ModelSerializer
# Serializer

class FileSerializer (serializers.ModelSerializer) :

    class Meta:
        model = File
        fields = "__all__"



class AccessSerializer (serializers.ModelSerializer) :
    document = FileSerializer(many=False)
    accessBy = UserSerializer(many=False)
    class Meta:
        model = Access
        fields = ["accessBy", "accessTo", "document"]

