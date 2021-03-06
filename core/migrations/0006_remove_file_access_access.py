# Generated by Django 4.0.4 on 2022-05-01 12:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0005_alter_file_document'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='access',
        ),
        migrations.CreateModel(
            name='Access',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('accessBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='given by +', to=settings.AUTH_USER_MODEL, verbose_name='Access given by')),
                ('accessTo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='given to +', to=settings.AUTH_USER_MODEL, verbose_name='Access given to')),
                ('document', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.file', verbose_name='Document')),
            ],
            options={
                'verbose_name': 'access',
                'verbose_name_plural': 'access',
            },
        ),
    ]
