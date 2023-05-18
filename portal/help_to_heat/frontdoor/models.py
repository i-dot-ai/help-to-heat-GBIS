import uuid

from django.core.serializers.json import DjangoJSONEncoder
from django.db import models
from help_to_heat import utils


class Event(utils.TimeStampedModel):
    name = models.CharField(max_length=256)
    data = models.JSONField(encoder=DjangoJSONEncoder)


class Answer(utils.UUIDPrimaryKeyBase, utils.TimeStampedModel):
    data = models.JSONField(encoder=DjangoJSONEncoder, editable=False)
    page_name = models.CharField(max_length=128, editable=False)
    session_id = models.UUIDField(default=uuid.uuid4, editable=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["page_name", "session_id"], name="unique answer per page per session")
        ]
