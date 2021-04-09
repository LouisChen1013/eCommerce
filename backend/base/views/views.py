from django.shortcuts import render
from rest_framework.response import Response
# from django.http import JsonResponse
# from .products import products
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from django.contrib.auth.models import User
# from .models import Product
# from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from django.contrib.auth.hashers import make_password
# from rest_framework import status

# Create your views here.

# # By default, the first parameter in the JsonResponse class is data that accepts an instance of dict. 
# # If you pass data that isn't a dictionary, you will have to set the safe parameter to False
# def getProducts(request): 
#     return JsonResponse(products, safe=False)


@api_view(['GET'])
def getRoutes(request):
    routes = [
        "/api/products",
        "/api/products/create/",
        "/api/products/upload/",
        "/api/products/<id>/reviews/",
        "/api/products/top/",
        "/api/products/<id>/",
        "/api/products/delete/<id>/",
        "/api/products/<update>/<id>/",
        "/admin/"
        "/api/users/login/"
        "/api/users/profile/"
        "/api/users"
        "/api/users/register/"
    ]
    return Response(routes)