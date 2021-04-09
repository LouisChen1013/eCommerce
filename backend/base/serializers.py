from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' # or ('id', ... ,created_at') or ['id', ... ,created_at']

# https://docs.djangoproject.com/en/3.1/ref/contrib/auth/
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True) # SerializerMethodField gets its value by calling a method on the serializer class it is attached to.
    _id = serializers.SerializerMethodField(read_only=True) # we use our own _id field here
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        # fields = '__all__'
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get_name(self, obj):
        name = obj.first_name # User object
        if name == "":
            name = obj.email
        
        return name

    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

# To obtain a brand new token when user updates/registers his info
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

