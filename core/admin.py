from django.contrib import admin
from .models import *

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('pk','user', "document", "description","created")


@admin.register(Access)
class AccessAdmin(admin.ModelAdmin):
    list_display = ('accessBy', "accessTo", "document", "timestamp")