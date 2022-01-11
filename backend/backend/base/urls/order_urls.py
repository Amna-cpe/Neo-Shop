from django.urls import path
from base.views import order_views


urlpatterns = [
    path('myorders', order_views.getMyOrders, name="get-orders-for-user"),
    path('<str:pk>/', order_views.getOrderItem, name="get-orderItem"),
    path('<str:pk>/pay', order_views.updateOrderToPay, name="pay-orderItem"),
    path('<str:pk>/delievered', order_views.updateOrderToDelievered, name="delievered-orderItem"),
    path('add', order_views.addOrderItem, name="add-orderItems"),
    path('', order_views.getAllOrders, name="add-orderItems"),


]
