# Generated by Django 5.2.1 on 2025-05-09 15:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0010_business'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics/'),
        ),
    ]
