from django.urls import include, path
from . import views
from rest_framework import routers

app_name = 'musicrater'

urlpatterns = [
    path('', views.index, name='index'),
    
    # add a new rating 
    # post request
    # returns {status:<'ok' if rating added or 'rating exists' if rating is already in db>}
    path('add-rating/<str:song>/<str:artist>/<int:rating>/<str:user>', views.AddRating.as_view(), name='views.AddRating.as_view()'),

    # edit a rating
    # put request
    # {status:<'ok' if rating edited>
    path('edit-rating/<int:key>/<str:newRating>', views.EditRating.as_view(), name='views.EditRating.as_view()'),

    # edit song and artist
    #put request 
    # returns {status:<'ok' if song edited or 'rating exists' if the user has already rated a song with the new song and new artist>}
    path('edit-song-artist/<int:key>/<str:song>/<str:artist>', views.EditSong.as_view(), name='views.EditSong.as_view()'),

    # delete rating
    # delete request
    # returns {status:<'ok' if song edited deleted>}
    path('delete-rating/<int:key>', views.DeleteRating.as_view(), name='views.DeleteRating.as_view()'),

    #get users ratings
    #get request 
    #returns {ratings:[(song: <song name> ,artist: <song's artist>,rating:<user's rating>, id: <primary_key for rating>, user: <user>},...]}
    path('user-ratings/<str:user>', views.UserRatings.as_view(), name='views.UserRatings.as_view()'),

    #get summary ratings for all songs (for social tab)
    #get request
    # returns {ratings:[(song: <song name> ,artist: <song's artist>, average: <average rating of song for all users>},...]}
    path('summary-all-ratings', views.SummaryRatings.as_view(), name='views.SummayRatings.as_view()'),

    
]
