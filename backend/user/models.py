from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, username, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30)
    username = models.CharField(max_length=150, unique=True)
    contact = models.CharField(max_length=15)
    address = models.TextField()
    email = models.EmailField(unique=True)
    profile_image = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name', 'contact', 'address']

    class Meta:
        db_table = 'user_customuser'

    def __str__(self):
        return self.email

# Ensure your Business model has the proper image field:

from django.db import models

class Business(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    business_type = models.CharField(max_length=255)
    landline = models.CharField(max_length=20, blank=True, null=True)
    operating_hours = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.TextField()
    # Make sure upload_to is defined correctly
    image = models.ImageField(upload_to='business_images/', blank=True, null=True)
    
    def __str__(self):
        return self.name
    
# Add this to your existing models.py file

class Rating(models.Model):
    business = models.ForeignKey('Business', on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.business.name} - {self.rating} stars"