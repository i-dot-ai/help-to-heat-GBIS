import datetime

import django.db.utils
from help_to_heat.ecoplus import models
from nose.tools import assert_raises

from . import utils


@utils.with_client
def test_epc_duplicates(client):
    data = {
        "uprn": "12345",
        "rating": "A",
        "date": datetime.date(2020, 12, 25),
    }
    epc1 = models.EpcRating(**data)
    epc1.save()
    with assert_raises(django.db.utils.IntegrityError):
        epc2 = models.EpcRating(**data)
        epc2.save()
