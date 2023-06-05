from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework import serializers
from rest_framework.parsers import JSONParser

from . import models


@require_http_methods(["GET"])
@login_required(login_url="portal:unauthorised")
def index_view(request):
    return render(
        request,
        template_name="index.html",
        context={"request": request},
    )


@require_http_methods(["GET"])
def unauthorised_view(request):
    return render(request, "portal/unauthorised.html", {}, status=403)


@require_http_methods(["GET"])
@login_required(login_url="portal:unauthorised")
def homepage_view(request):
    user = request.user
    if not user.is_supplier_admin and not user.is_team_leader and not user.is_team_member:
        return redirect("portal:unauthorised")
    if (user.is_team_leader or user.is_team_member) and not user.supplier:
        return unauthorised_view(request)
    template = "unauthorised"
    data = {}
    if user.is_team_member:
        template = "portal/team-member/homepage.html"
    if user.is_team_leader:
        supplier = user.supplier
        team_members = models.User.objects.filter(
            Q(supplier=supplier) & (Q(is_team_member=True) | Q(is_team_leader=True))
        )

        data = {
            "team_members": team_members,
        }
        template = "portal/team-leader/homepage.html"
    if user.is_team_member or user.is_team_leader:
        supplier = user.supplier
        referrals = models.Referral.objects.filter(referral_download=None, supplier=supplier)
        unread_leads = referrals.count()
        archives = models.ReferralDownload.objects.filter(referral_download__supplier=supplier).order_by("-created_at")
        data = {"supplier": supplier, "unread_leads": unread_leads, "archives": archives, **data}
    if user.is_supplier_admin:
        template = "portal/supplier-admin/homepage.html"
        suppliers = models.Supplier.objects.all()

        data = {
            "suppliers": suppliers,
        }
    return render(
        request,
        template_name=template,
        context={"request": request, "data": data},
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


@require_http_methods(["GET"])
def healthcheck_view(request):
    _ = models.User.objects.exists()
    data = {"healthy": True, "datetime": timezone.now()}
    return JsonResponse(data, status=201)
