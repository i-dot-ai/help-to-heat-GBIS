import csv
from datetime import datetime

from django.contrib.auth.decorators import login_required
from django.db.models import Max
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods

from help_to_heat.ecoplus import models


@require_http_methods(["GET"])
@login_required
def download_csv_view(request):
    most_recent_entry = models.ReferralDownload.objects.aggregate(max_created_at=Max("created_at"))["max_created_at"]
    if most_recent_entry is None:
        referrals = models.Referral.objects.all()
    else:
        referrals = models.Referral.objects.filter(created_at__gt=most_recent_entry)
    downloaded_at = datetime.now()
    file_name = downloaded_at.strftime("%d-%m-%Y %H_%M")
    new_referral_download = models.ReferralDownload.objects.create(
        created_at=downloaded_at, file_name=file_name, last_downloaded_by=request.user
    )
    response = create_referral_csv(referrals, file_name)
    new_referral_download.save()
    return response


@require_http_methods(["GET"])
@login_required
def download_csv_by_id_view(request, download_id):
    referral_download = models.ReferralDownload.objects.get(pk=download_id)
    if referral_download is None:
        return HttpResponse(status=404)
    older_instances = models.ReferralDownload.objects.filter(created_at__lt=referral_download.created_at).order_by(
        "-created_at"
    )
    if not older_instances:
        previous_referral_download = None
    else:
        previous_referral_download = older_instances[0]
    if previous_referral_download:
        referrals = models.Referral.objects.filter(
            created_at__gt=previous_referral_download.created_at, created_at__lt=referral_download.created_at
        )
    else:
        referrals = models.Referral.objects.filter(created_at__lt=referral_download.created_at)
    response = create_referral_csv(referrals, referral_download.file_name)
    referral_download.last_downloaded_by = request.user
    referral_download.save()
    return response


def create_referral_csv(referrals, file_name):
    headers = {
        "Content-Type": "text/csv",
        "Content-Disposition": f"attachment; filename=referral-data-{file_name}.csv",
    }
    rows = [referral.data for referral in referrals]
    data_keys = []
    for row in rows:
        data_keys = data_keys | row.keys()
    fieldnames = data_keys
    response = HttpResponse(headers=headers)
    writer = csv.DictWriter(response, fieldnames=fieldnames)
    writer.writeheader()
    for row in rows:
        writer.writerow(row)
    return response
