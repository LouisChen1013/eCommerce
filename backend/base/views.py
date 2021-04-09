from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer, UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

# Create your views here.

# # By default, the first parameter in the JsonResponse class is data that accepts an instance of dict. 
# # If you pass data that isn't a dictionary, you will have to set the safe parameter to False
# def getProducts(request): 
#     return JsonResponse(products, safe=False)

# # How to customize token claims: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims. we can update the user dictionary. For example, we can do `token['message'] = 'hello world'`
#         # In this case, we can obtain our additional info(username, email) by decoding the access token on the https://jwt.io/
#         # token['name'] = user.name
#         token['username'] = user.username
#         token['email'] = user.email

#         return token


# https://github.com/jazzband/django-rest-framework-simplejwt/blob/master/rest_framework_simplejwt/serializers.py
# We customize our additional info(username, email) outside the access token. In this case, we don't have to decode the access token to gain the info
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
     def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email

        serializer = UserSerializerWithToken(self.user).data # use .data to decode our class
        print(type(serializer))

        for k, v in serializer.items():
            data[k] = v
        
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


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

@api_view(['GET'])
def getProducts(request): 
    # return Response(products) # used for products.py testing
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True) # To serialize a queryset or list of objects instead of a single object instance
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    """
    # used for products.py testing
    product = None
    for i in products:
        if i['_id'] == pk:
            product = i
            break
    return Response(product)
    """
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# Django can get current logged-in user(request.user) using the default authentication system.
# Since we are using REST framework and JWT token(DEFAULT_AUTHENTICATION_CLASSES in the settings.py), we need to pass our encoded token to get our user info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request): 
    user = request.user 
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    # print('DATA:', data)
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer=UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    # https://www.django-rest-framework.org/api-guide/status-codes/
    except:
        message = {"detail":"User with this email already exists"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)