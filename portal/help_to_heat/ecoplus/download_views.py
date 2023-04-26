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
    print(request.user)
    most_recent_entry = models.ReferralDownload.objects.aggregate(max_created_at=Max('created_at'))['max_created_at']
    if most_recent_entry is None:
        referrals = models.Referral.objects.all()
    else:
        referrals = models.Referral.objects.filter(created_at__gt=most_recent_entry)
    downloaded_at = datetime.now()
    file_name = downloaded_at.strftime('%d-%m-%Y %H_%M')
    new_referral_download = models.ReferralDownload.objects.create(created_at=downloaded_at, file_name=file_name, downloaded_by=request.user)
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
    new_referral_download.save()
    return response
