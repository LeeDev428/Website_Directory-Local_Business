from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

CustomUser = get_user_model()  # safer than importing directly from models

class CustomUserModelAdmin(UserAdmin):
    # Customize admin fields if needed
    model = CustomUser
    list_display = ['email', 'username', 'is_staff']

admin.site.register(CustomUser, CustomUserModelAdmin)
