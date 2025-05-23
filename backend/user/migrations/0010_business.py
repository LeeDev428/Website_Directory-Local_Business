# Generated by Django 5.2.1 on 2025-05-09 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_customuser_date_joined'),
    ]

    operations = [
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('website', models.URLField(blank=True, null=True)),
                ('business_type', models.CharField(max_length=255)),
                ('landline', models.CharField(blank=True, max_length=20, null=True)),
                ('operating_hours', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('address', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='business_images/')),
            ],
        ),
    ]
