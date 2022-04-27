from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from .models import Ratings
from requests import post, get
from rest_framework.views import APIView
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.response import Response
from rest_framework import status

def index(request):
    return render(request, '../frontendbuild/index.html')

# add a new rating 
# returns {status:<'ok' if rating added or 'rating exists' if rating is already in db>}
class AddRating(APIView):
    def post(self, request, song, artist, rating, user):
        exists=Ratings.objects.filter(song=song).filter(user=user).filter(artist=artist).exists()
        print(song,artist,rating,user)
        if exists: return Response({"status":'rating exists'}, status=status.HTTP_200_OK)
        else:
            r=Ratings()
            r.artist=artist
            r.song=song
            r.rating=rating
            r.user=user
            r.save()
            return Response({"status":'ok'}, status=status.HTTP_200_OK)

# edit a rating
# {status:<'ok' if rating edited>
class EditRating(APIView):
    def put(self, request, key, newRating):
        rating=Ratings.objects.get(id=key)
        rating.rating=newRating
        return Response({status:'ok'}, status=status.HTTP_200_OK)

# modify the song of a rating
# returns {status:<'ok' if song edited or 'rating exists' if the user has already rated a song with the new song and new artist>}
class EditSong(APIView):
    def put(self, request, key, artist, song):
        rating=Ratings.objects.get(id=key)
        exists=Ratings.objects.filter(song=song).filter(user=rating.user).filter(artist=artist).exists()
        if exists: return Response({status:'rating exists'}, status=status.HTTP_200_OK)
        else:
            rating.song=song
            rating.artist=artist
            rating.save()
            return Response({status:'ok'}, status=status.HTTP_200_OK)

# delete rating
# returns {status:<'ok' if song edited deleted>}
class DeleteRating(APIView):
    def delete(self, request, key):
        rating=Ratings.objects.get(id=key)
        rating.delete()
        return Response({'status': 'ok'}, status=status.HTTP_200_OK)
    


#get users ratings
# returns {ratings:[(song: <song name> ,artist: <song's artist>,rating:<user's rating>, key: <primary_key for rating>, user: <user>},...]}
class UserRatings(APIView):
    def get(self, request, user):
        ratings= Ratings.objects.filter(user=user)
        return Response({ratings:ratings}, status=status.HTTP_200_OK)

#get summary ratings for all songs
# returns {ratings:[(song: <song name> ,artist: <song's artist>,rating:<user's rating, none/null if not rated>, average: <average rating of song for all users>},...]}
class SummaryRatings(APIView):
    def getAvgRating(self,song, artist):
        avg=0
        ratings=Ratings.objects.filter(song=song).filter(artist=artist)
        count=ratings.count()
        if not count: return None
        for r in ratings:
            avg+=(1/count)* r.rating
        return avg
        
    def get(self, request, user):
        res=[]
        songs=Ratings.objects.values("song").distinct()
        for song in songs:
            artists=Ratings.objects.filter(song=song).values("artist").distinct()
            for artist in artists: 
                try:
                    r=Ratings.objects.get(song=song, user=user).rating
                except:
                    r=None
                res.append({
                    'song': song,
                    'artist': artist,
                    'rating': r,
                    'average': self.getAvgRating(song, artist),
                })
        return Response(res, status=status.HTTP_200_OK)
