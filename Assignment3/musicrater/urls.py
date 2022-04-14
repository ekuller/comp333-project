from django.urls import include, path
from . import views
from rest_framework import routers

app_name = 'musicrater'


rRouter = routers.DefaultRouter()
rRouter.register(r'', views.RateView, 'musicrater')

sRouter = routers.DefaultRouter()
sRouter.register(r'', views.SongView, 'musicrater')

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
    path('get-ratings/<str:spotifyID>', views.UserRatings.as_view()),
    path('get-ratings-summary/<str:spotifyID>', views.RatingsSummary.as_view()),
    path('get-new-rec/<str:sessionId>/<str:trackId>', views.Recomendation.as_view()),
    path('rate/',include(rRouter.urls) ),
    path('song',include(sRouter.urls) ),
    path('delete-song/<str:song>', views.DeleteSong.as_view()),
    path('edit-song/<str:ratingKey>/<str:artist>/<str:song>', views.EditSong.as_view())
]
