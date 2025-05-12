"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect
from user.views import DashboardRedirectView
from django.conf import settings
from django.conf.urls.static import static

def redirect_to_frontend(request):
    return HttpResponseRedirect('http://localhost:3000/')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls')),  # Assuming 'user.urls' contains your API routes
    path('api/dashboard/', DashboardRedirectView.as_view(), name='dashboard-redirect'),
    path('', redirect_to_frontend),  # Redirect root URL to Next.js frontend
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
