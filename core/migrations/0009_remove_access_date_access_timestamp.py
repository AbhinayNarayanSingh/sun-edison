# Generated by Django 4.0.4 on 2022-05-01 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_remove_file_modified_alter_access_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='access',
            name='date',
        ),
        migrations.AddField(
            model_name='access',
            name='timestamp',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
