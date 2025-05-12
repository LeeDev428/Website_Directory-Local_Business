from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserRegisterView, BusinessManagementView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserRegisterView, 
    UserLoginView, 
    DashboardRedirectView, 
    BusinessManagementView,
    UserProfileView,
    ProfileImageUploadView,
    BusinessListView,
    BusinessDetailView,
    BusinessViewSet,
    RatingViewSet,
    BusinessRatingsView,
    UserListView,
)
from django.conf import settings
from django.conf.urls.static import static
router = DefaultRouter()
router.register(r'business', BusinessViewSet, basename='business')
router.register(r'ratings', RatingViewSet, basename='rating')

urlpatterns = [
    path('login/', UserLoginView.as_view(), name='login'),
    path('register/', UserRegisterView.as_view(), name='user'),
    path('business/', BusinessManagementView.as_view(), name='business-management'),
    path('business/<int:pk>/', BusinessManagementView.as_view(), name='business-detail'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/upload-image/', ProfileImageUploadView.as_view(), name='profile-image-upload'),
    path('dashboard-redirect/', DashboardRedirectView.as_view(), name='dashboard-redirect'),
    # Uncomment these lines
    path('users/', UserListView.as_view(), name='user-list'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('businesses/', BusinessListView.as_view(), name='business-list'),
    path('businesses/<int:pk>/', BusinessDetailView.as_view(), name='business-detail'),
    path('business/<int:pk>/ratings/', BusinessRatingsView.as_view(), name='business_ratings'),

    path('', include(router.urls)),  # In
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)