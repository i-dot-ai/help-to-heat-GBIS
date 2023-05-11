import datetime

from help_to_heat.ecoplus import models

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
    epc2 = models.EpcRating(**data)
    epc2.save()

    result = client.get("/api/epc-rating/12345/")
    expected = {
        "uprn": "12345",
        "rating": "A",
        "date": "2020-12-25",
    }
    print(result)
    print(result.content)
    assert result.json() == expected
