# Generated by Django 4.0.4 on 2022-04-24 08:25

import core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=255, verbose_name='Created by')),
                ('document', models.FileField(upload_to=core.models.document_dir_path)),
                ('created', models.DateField(auto_now_add=True)),
                ('modified', models.DateField(auto_now=True)),
                ('modifier', models.CharField(max_length=250, verbose_name='Modified by')),
                ('access', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Who has access')),
            ],
            options={
                'verbose_name': 'file',
                'verbose_name_plural': 'files',
            },
        ),
    ]
