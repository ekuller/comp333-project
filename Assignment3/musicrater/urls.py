from django.urls import include, path
from . import views

app_name = 'musicrater'
urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('reg_succ', views.reg_succ, name='reg_succ'),
    path('retrieve', views.retrieve, name='retrieve'),
    path('retrieveByEmoji', views.retrieveByEmoji, name='retrieveByEmoji'),
    path('get-auth-url', views.AuthURL.as_view()),
    path('redirect', views.spotify_callback),
    path('is-authenticated', views.IsAuthenticated.as_view()),
    path('get-user', views.UserName.as_view())
]
