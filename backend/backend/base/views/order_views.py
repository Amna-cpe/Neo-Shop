from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from datetime import datetime
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializer import OrderSerializer
from base.products import products

from rest_framework import status


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPay(request , pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("Order was paid")

@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelievered(request , pk):
    order = Order.objects.get(_id=pk)
    order.isDelieverd = True
    order.delieverdAt = datetime.now()
    order.save()
    return Response("Order was delieverd")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderItem(request,pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order , many= False)
            return Response(serializer.data)
        return Response({"detail":"Not authorized to view this order"},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail":"Order does not exist"},status=status.HTTP_404_NOT_FOUND)
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user = request.user
    data = request.data

    OrderItems = data['orderItems']
    shippingAddress = data['shippingAddress']

    if OrderItems and len(OrderItems) == 0:
        return Response({"detail": "No order item"}, status= status.HTTP_400_BAD_REQUEST)
    else:
        # [1] create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['total'])
        # [2] create shipping address
        shipping = ShippingAddress.objects.create(
                order = order,
                address =shippingAddress['address'],
                city = shippingAddress['city'],
                postalCode = shippingAddress['postalcode'],
                country = shippingAddress['country']
        )
        # [3] create orderItems and set the order to order items relationship
        for i in OrderItems:
            product = Product.objects.get(_id = i['product'])
            item = OrderItem.objects.create(
                    product = product,
                    order =order,
                    name = product.name,
                    qty = i['qty'],
                    price = i['price'],
                    image = product.image.url
            )
            # [4]  update stock in each product
            product.countInStock -= int(item.qty)
            product.save()

        serializer = OrderSerializer(order,many=False)

        return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAdminUser])
def getAllOrders(request ):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

