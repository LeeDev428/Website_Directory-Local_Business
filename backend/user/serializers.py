from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, Business, Rating


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
  

    class Meta:
        model = CustomUser
        fields = [
            "id", "first_name", "middle_name", "last_name", "username",
            "contact", "address", "email", "password", "confirm_password"
        ]

    def validate(self, data):
        if CustomUser.objects.filter(username=data["username"]).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})

        if CustomUser.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})

        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError({"password": "Passwords do not match!"})

        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = CustomUser(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ['id', 'name', 'website', 'business_type', 'landline', 
                 'operating_hours', 'description', 'address', 'image']
    
    # This correctly handles returning image URLs
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.image:
            request = self.context.get('request')
            if request:
                representation['image'] = request.build_absolute_uri(instance.image.url)
            else:
                representation['image'] = instance.image.url
        return representation
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return obj.image.url
            return obj.image.url
        return None

# Add this new serializer to your existing serializers.py

class UserProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    bio = serializers.CharField(source='address', required=False)
    image = serializers.SerializerMethodField()  # Add this line
    
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'email', 'image', 'first_name', 'last_name', 'contact', 'bio']
    
    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    
    # In your UserProfileSerializer class:
    def get_image(self, obj):
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                # Return the URL relative to the domain
                return obj.profile_image.url
            return obj.profile_image.url
        return None
    
    
    
    def update(self, instance, validated_data):
        # Handle the 'name' field
        if 'name' in self.initial_data:
            name_parts = self.initial_data['name'].split(' ', 1)
            instance.first_name = name_parts[0]
            instance.last_name = name_parts[1] if len(name_parts) > 1 else ''
        
        # Handle address data
        if 'address' in validated_data:
            instance.address = validated_data.pop('address')
        
        # Handle image data from frontend's 'image' field to database's 'profile_image'
        if 'image' in self.initial_data:
            instance.profile_image = self.initial_data['image']
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance

# Add this to your existing serializers.py file

from rest_framework import serializers
from .models import Rating, Business

class RatingSerializer(serializers.ModelSerializer):
    business = serializers.SerializerMethodField()  # Add this field

    class Meta:
        model = Rating
        fields = ['id', 'business', 'rating', 'comment', 'created_at']

    def get_business(self, obj):
        return {
            'id': obj.business.id,
            'name': obj.business.name
        }
 