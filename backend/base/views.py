from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer

# Create your views here.

# By default, the first parameter in the JsonResponse class is data that accepts an instance of dict. 
# If you pass data that isn't a dictionary, you will have to set the safe parameter to False
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
