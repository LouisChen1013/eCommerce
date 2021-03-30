from django.urls import path
from . import views

urlpatterns = [
    path("", views.getRoutes, name="routes"), # call the getRoutes func in the views.py based on the url we specified
    path("products/", views.getProducts, name="products"),
    path("products/<str:pk>/", views.getProduct, name="product"),
]
