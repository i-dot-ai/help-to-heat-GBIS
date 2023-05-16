import marshmallow
from help_to_heat.utils import Entity, Interface, register_event, with_schema

from . import models, schemas


class SaveAnswerSchema(marshmallow.Schema):
    session_id = marshmallow.fields.UUID()
    page_name = marshmallow.fields.String()
    data = marshmallow.fields.Nested(schemas.SessionSchema(unknown=marshmallow.EXCLUDE))


class GetAnswerSchema(marshmallow.Schema):
    session_id = marshmallow.fields.UUID()
    page_name = marshmallow.fields.String()


class Session(Entity):
    @with_schema(load=SaveAnswerSchema, dump=schemas.SessionSchema)
    @register_event(models.Event, "Answer saved")
    def save_answer(self, session_id, page_name, data):
        answer, created = models.Answer.objects.update_or_create(
            session_id=session_id,
            page_name=page_name,
            defaults={"data": data},
        )
        return answer.data

    @with_schema(load=GetAnswerSchema, dump=schemas.SessionSchema)
    def get_answer(self, session_id, page_name):
        try:
            answer = models.Answer.objects.get(session_id=session_id, page_name=page_name)
            return answer.data
        except models.Answer.DoesNotExist:
            return {}


api = Interface(session=Session())
