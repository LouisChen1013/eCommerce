from django.urls import path
from . import views
# from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("", views.getRoutes, name="routes"), # call the getRoutes func in the views.py based on the url we specified
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>/", views.getProduct, name="product"),
    path("users/login/",views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("users/profile/", views.getUserProfile, name="users-profile"),
    path("users/", views.getUsers, name="users"),
    path("users/register/", views.registerUser, name="register")
]
