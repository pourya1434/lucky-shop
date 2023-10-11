"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from azbankgateways.urls import az_bank_gateways_urls
from .bank import callback_gateway_view, go_to_gateway_view

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
    path("bankgateways/", az_bank_gateways_urls()),
    path("go-to-gateway/", go_to_gateway_view, name="go_to_gateway"),
    path(
        "bankgateways/callback/callback-gateway/",
        callback_gateway_view,
        name="callback_gateway",
    ),
     ]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)