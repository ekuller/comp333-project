from django.urls import include, path
from . import views

app_name = 'musicrater'
urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('reg_succ', views.reg_succ, name='reg_succ'),
    path('retrieve', views.retrieve, name='retrieve'),
    path('retrieveByEmoji', views.retrieveByEmoji, name='retrieveByEmoji'),
    path('redirect', views.spotify_callback),
    path('loginfailed', views.login_failed, name='login_failed'),
    path('is-authenticated/<str:session_id>', views.IsAuthenticated.as_view()),
    path('get-top-songs/<str:session_id>', views.TopSongs.as_view()),
    path('get-new-rec/<str:sessionId>/<str:trackId>', views.Recomendation.as_view()),
    path('rate', views.rate)
]
