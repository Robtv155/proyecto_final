"""
URL configuration for mi_pagina_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from contenido.views import index
from django.conf.urls.static import static
#from contenido.views import compra
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('contenido.urls')),
    path('api/', include('contenido.api_urls')),
]

handler404 = 'contenido.views.custom_404'
handler403 = 'contenido.views.custom_403'
handler500 = 'contenido.views.custom_500'
handler400 = 'contenido.views.custom_400'