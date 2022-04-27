from rest_framework import serializers
from .models import *
from user.models import User

# serializers.ModelSerializer
# Serializer

class FileSerializer (serializers.ModelSerializer) :

    class Meta:
        model = File
        fields = "__all__"
        depth = 1