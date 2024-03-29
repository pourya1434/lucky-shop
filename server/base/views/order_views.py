from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']
    # print('orderItems => ',orderItems)

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Item'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1=> create order
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice'],
        )
        # 2=> create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            street=data['shippingAddress']['street'],
        )
#   {'product': {'_id': 1, 'name': 'Tshirt', 'imageAlt': 't-shirt', 'imageSrc': '/images/tshirt.jpg', 'brand': 'homemade', 'category': 'clothes', 'description': 'T-shirt created with the best materials.\r\nhave a various design\r\nall sizes are available', 'rating': 0, 'reviewCount': 1, 'price': '41.20', 'counterInStock': 10, 'createdAt': '2023-08-12T11:14:17.542651Z', 'user': 1}, 'qty': '2'}       
        # 3=> create order items and set order to order item relationship
        for i in orderItems:
            # print('******=====>',i)
            product = Product.objects.get(_id=i['product']['_id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=product.price,
                image=product.imageSrc,
            )
            print('item => ', item)
            # 4=> update count in stock
            product.counterInStock -= int(item.qty)
            product.save()
        # serializer = OrderItemSerializer(item, many=False)

        serializer = OrderSerializer(order, many=False)
        # print(serializer.data)
        return Response(serializer.data)
# اگر دو نفر همزمان یه چیز بخرن


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'details': 'Not authorize to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'details': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('order was paid')

# Get all orders


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# Update Deliver status


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('order was delivered')
