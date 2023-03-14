from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import serializers
from rest_framework.parsers import JSONParser

from . import models


@require_http_methods(["GET"])
def index_view(request):
    return render(
        request,
        template_name="index.html",
        context={"request": request},
    )


@require_http_methods(["GET"])
def homepage_view(request):
    return render(
        request,
        template_name="homepage.html",
        context={"request": request},
    )


class RefferalSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Referral
        fields = ["data"]


@csrf_exempt
@require_http_methods(["POST"])
def create_referral(request):
    data = JSONParser().parse(request)
    serializer = RefferalSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)
