from rest_framework import status, parsers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from .models import CustomUser, Business, Rating
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, BusinessSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserProfileSerializer
from .serializers import RatingSerializer
from .models import CustomUser
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import BusinessSerializer

import os

class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registered successfully!", "user": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

    
        user = authenticate(username=email, password=password)

        if user is not None:
        
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful!",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

class DashboardRedirectView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_superuser:
            return Response({"dashboard": "admin"}, status=200)
        return Response({"dashboard": "user"}, status=200)

class BusinessManagementView(APIView):
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def get(self, request, pk=None):
        if pk:
            # Get single business
            try:
                business = Business.objects.get(pk=pk)
                serializer = BusinessSerializer(business)
                return Response(serializer.data)
            except Business.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            # Get all businesses
            businesses = Business.objects.all()
            serializer = BusinessSerializer(businesses, many=True)
            return Response(serializer.data)

        # Fix the post method - add proper indentation (4 spaces)
    def post(self, request):
        print("Received FILES:", request.FILES)  # Debug line
        
        # Create a copy of request.data to avoid modifying the immutable QueryDict
        data = request.data.copy()
        
        # If an image was uploaded, it will be in request.FILES
        if 'image' in request.FILES:
            # The image is already in request.FILES which serializer will access
            print("Image file received:", request.FILES['image'].name)
        
        serializer = BusinessSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            business = serializer.save()
            print(f"Business saved with image: {business.image}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print("Validation errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk=None):
        try:
            business = Business.objects.get(pk=pk)
        except Business.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        serializer = BusinessSerializer(business, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk=None):
        try:
            business = Business.objects.get(pk=pk)
            business.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Business.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        


class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [AllowAny]  # Change to IsAuthenticated when ready for production
    
    def get(self, request):
        try:
            # Try to get the authenticated user first
            if request.user and request.user.is_authenticated:
                user = request.user
            # Fallback to first user for development
            else:
                user = CustomUser.objects.first()
                
            # Get real user data using your serializer
            serializer = UserProfileSerializer(user, context={'request': request})
            
            # Include the profile data + counts
            data = serializer.data
            data.update({
                'followers_count': 125,  # You can replace these with real counts later
                'following_count': 86,
                'posts_count': 12
            })
            
            return Response(data)
            
        except Exception as e:
            print(f"Error in UserProfileView.get: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def patch(self, request):
        """Update the current user's profile with partial data"""
        try:
            # For development: If user is not authenticated, get the first user
            if request.user.is_anonymous:
                user = CustomUser.objects.first()
                if not user:
                    return Response({"error": "No users in database"}, status=status.HTTP_404_NOT_FOUND)
            else:
                user = request.user
            
            # Update the user with real data
            serializer = UserProfileSerializer(
                user, 
                data=request.data, 
                partial=True, 
                context={'request': request}
            )
            
            if serializer.is_valid():
                serializer.save()
                
                # Include the counts in the response
                data = serializer.data
                data.update({
                    'followers_count': 125,
                    'following_count': 86,
                    'posts_count': 12
                })
                
                return Response(data)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print(f"Error in UserProfileView.patch: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
from rest_framework.parsers import MultiPartParser, FormParser

# Add this view class
class ProfileImageUploadView(APIView):
    permission_classes = [AllowAny]  # Allow any access for development
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request, *args, **kwargs):
        try:
            # For development: If user is not authenticated, get the first user
            if request.user.is_anonymous:
                user = CustomUser.objects.first()
                if not user:
                    return Response({"error": "No users in database"}, status=status.HTTP_404_NOT_FOUND)
            else:
                user = request.user
            
            # Handle image upload
            image = request.FILES.get('image')
            if not image:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Save the image
            user.profile_image = image
            user.save()
            
            # Return the image URL
            return Response({
                "image": request.build_absolute_uri(user.profile_image.url)
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            print(f"Error in ProfileImageUploadView.post: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class BusinessListView(APIView):
    def get(self, request):
        businesses = Business.objects.all()
        serializer = BusinessSerializer(businesses, many=True, context={'request': request})
        return Response(serializer.data)

class BusinessDetailView(APIView):
    def get(self, request, pk):
        try:
            business = Business.objects.get(pk=pk)
            serializer = BusinessSerializer(business, context={'request': request})
            return Response(serializer.data)
        except Business.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
# Update your existing BusinessListView class

class BusinessListView(APIView):
    def get(self, request):
        business_type = request.query_params.get('business_type', None)
        
        if business_type:
            businesses = Business.objects.filter(business_type=business_type)
        else:
            businesses = Business.objects.all()
        
        serializer = BusinessSerializer(businesses, many=True, context={'request': request})
        return Response(serializer.data)
    
class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    parser_classes = [MultiPartParser, FormParser]
    
    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        print("Files:", request.FILES)
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print("Update received data:", request.data)
        print("Update files:", request.FILES)
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Add these to your existing views.py file

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    
    def perform_create(self, serializer):
        serializer.save()

# Business ratings endpoint
class BusinessRatingsView(APIView):
    def get(self, request, pk=None):
        ratings = Rating.objects.filter(business_id=pk)
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)

class UserListView(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)