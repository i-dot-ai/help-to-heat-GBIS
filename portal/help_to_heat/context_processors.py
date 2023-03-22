from django.conf import settings


def add_settings_to_context(request):
    return {"space_name": settings.VCAP_APPLICATION.get("space_name", "unknown")}
