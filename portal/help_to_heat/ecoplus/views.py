import datetime

from django.contrib.auth.decorators import login_required, user_passes_test
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


def unauthorised_view(request):
    return render(request, "unauthorised.html", {}, status=403)


is_supplier = user_passes_test(
    lambda user: user.is_supplier and user.supplier, login_url="unauthorised", redirect_field_name=None
)


@require_http_methods(["GET"])
@login_required
@is_supplier
def homepage_view(request):
    archived_files = (
        {
            "date": datetime.date(2022, 2, 1),
        },
        {
            "date": datetime.date(2022, 2, 23),
        },
        {
            "date": datetime.date(2022, 3, 14),
        },
    )
    archived_files = tuple(reversed(sorted(archived_files, key=lambda x: x["date"])))
    return render(
        request,
        template_name="homepage.html",
        context={"request": request, "archived_files": archived_files},
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


@csrf_exempt
@require_http_methods(["GET"])
def lookup_epc_view(request, uprn):
    try:
        epc_rating = models.EpcRating.objects.get(uprn=uprn)
    except models.EpcRating.DoesNotExist:
        return JsonResponse({"errors": "Not found"}, status=400)
    data = {
        "uprn": epc_rating.uprn,
        "rating": epc_rating.rating,
        "date": epc_rating.date,
    }
    return JsonResponse(data, status=201)
