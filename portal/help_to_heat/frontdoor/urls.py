from django.urls import path

from . import views

frontdoor_patterns = [
    path("", views.homepage_view, name="homepage"),
    path("feedback/", views.FeedbackView, name="feedback"),
    path("feedback/thanks/", views.FeedbackView, name="feedback-thanks"),
    path("feedback/<uuid:session_id>/<str:page_name>/", views.FeedbackView, name="feedback"),
    path("feedback/thanks/<uuid:session_id>/<str:page_name>/", views.feedback_thanks_view, name="feedback-thanks"),
    path("<uuid:session_id>/<str:page_name>/change/", views.change_page_view, name="change-page"),
    path("<uuid:session_id>/<str:page_name>/", views.page_view, name="page"),
]
