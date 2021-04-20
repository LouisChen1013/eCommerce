from django.shortcuts import render
# from .products import products
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework import status


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


# 1. create a placeholder/container for a product
# 2. redirect to a edit product page
# 3. finalize the product with correct info
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request): 

    user = request.user
    product = Product.objects.create(
        user = user,
        name = 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = 'Sample Category',
        description = ''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk): 
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')
