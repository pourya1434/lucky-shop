from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.


def getRoutes(request):
    return JsonResponse("hello", safe=False)


@api_view(["GET"])
def getProducts(request):
    return Response(products)


@api_view(["GET"])
def getProduct(request, pk):
    product = None
    review = None
    faqs = None
    for i in products:
        if i["_id"] == pk:
            product = i
            break
    return Response(product)
