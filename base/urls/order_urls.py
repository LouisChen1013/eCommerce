from django.urls import path
from base.views import order_views as views
# from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
path('',views.getOrders, name='orders'),

path('add/',views.addOrderItem, name='orders-add'),
path('myorders/',views.getMyOrder, name='my-orders'), # we have to put this url before our dynamic url since django will search the list from top to bottom. <str:pk> will match any string url(e.g., myorders), and this will cause an error/return nothing

path('<str:pk>/',views.getOrderById, name='user-order'),
path('<str:pk>/delivered/',views.updateOrderToDelivered, name='order-delivered'),
path('<str:pk>/pay/',views.updateOrderToPaid, name='order-pay'),
]