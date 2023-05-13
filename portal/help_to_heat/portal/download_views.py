import csv

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from help_to_heat.portal import models


@require_http_methods(["GET"])
@login_required
def download_csv_view(request):
    referrals = models.Referral.objects.filter(referral_download=None, supplier=request.user.supplier)
    downloaded_at = timezone.now()
    file_name = downloaded_at.strftime("%d-%m-%Y %H_%M")
    new_referral_download = models.ReferralDownload.objects.create(
        created_at=downloaded_at, file_name=file_name, last_downloaded_by=request.user
    )
    response = create_referral_csv(referrals, file_name)
    new_referral_download.save()
    referrals.update(referral_download=new_referral_download)
    return response


@require_http_methods(["GET"])
@login_required
def download_csv_by_id_view(request, download_id):
    referral_download = models.ReferralDownload.objects.get(pk=download_id)
    if referral_download is None:
        return HttpResponse(status=404)
    referrals = models.Referral.objects.filter(referral_download=referral_download)
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
