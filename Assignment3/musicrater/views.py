from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, HttpResponse
from .models import SpotifyUsers, Artists, Ratings, Emojis
from requests import post, get
from rest_framework.views import APIView
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.response import Response
from rest_framework import status
from .util import *
from django.core import serializers
from rest_framework import viewsets
from .serializers import RateSerializer, SongSerializer

def index(request):
    return render(request, '../frontendbuild/index.html')
    
def register(request):
    if request.method=='POST':
        if request.POST.get('name') and request.POST.get('pwd'):
            try:
                usr = SpotifyUsers.objects.get(username=request.POST.get('name'))
                return render(request, 'musicrater/index.html', {
                        'error_message': "User already exists.",
                    })
            except:
                u=SpotifyUsers()
                u.username= request.POST.get('name')
                u.password= request.POST.get('pwd')
                u.save()
                return HttpResponseRedirect('/rater/reg_succ')
        else:
            return render(request, 'musicrater/index.html', {
            'error_message': "Please enter a valid username or password",
            })
    else:
        return HttpResponseRedirect('/rater')

def reg_succ(request):
    return render(request, 'musicrater/reg_succ.html')

def retrieve(request):
    if request.method=='POST':
        if request.POST.get('name'):
            name = request.POST.get('name')
            try:
                SpotifyUsers.objects.get(username=name)
                if Ratings.objects.filter(username=name):

                    return render(request, 'musicrater/index.html', {
                            'usr': name,
                            'user_reviews':Ratings.objects.filter(username=name)
                        })
                else:
                    return render(request, 'musicrater/index.html', {
                        'review_err_msg': "User does not have a review.",
                    })
            except:
                return render(request, 'musicrater/index.html', {
                        'review_err_msg': "user not found!",
                    })
        else:
            return render(request, 'musicrater/index.html', {
            'review_err_msg': "Please enter a valid username",
            })
    else:
        return HttpResponseRedirect('/rater')

def retrieveByEmoji(request):
    if request.method=='POST':
        if request.POST.get("emoji"):
            emoji=request.POST.get("emoji")
            emoji_percentage={}
            songs= Artists.objects.values_list('song', flat=True)
            for s in songs:
                reactions=Emojis.objects.filter(song=s)
                songReactions=reactions.count()
                if songReactions>0:
                    if emoji=="😁":
                        emojiSongCount=reactions.filter(happy=True).count()
                    if emoji=="🥺":
                        emojiSongCount=reactions.filter(sad=True).count()
                    if emoji=="🥳":
                        emojiSongCount=reactions.filter(celebration=True).count()
                    emoji_percentage[s]=str((emojiSongCount/songReactions)*100)+"%"
            return render(request, 'musicrater/index.html', {
                'emoji_report': emoji_percentage,
                'emoji': emoji
             })


class RateView(viewsets.ModelViewSet):
    serializer_class = RateSerializer 
    queryset = Ratings.objects.all()

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer 
    queryset = Artists.objects.all()


def spotify_callback(request, format=None):
    sessionID =  request.GET.get('state')
    code = request.GET.get('code')
    error = request.GET.get('error')
    print("session ID (django spotify callback)", sessionID)
    if error:
        print("USER FAILED TO LOGIN", error)
        return HttpResponseRedirect('http://localhost:3000/')
    userDict = dict()
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': "authorization_code",
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    })
    if response.ok:
        response = response.json()
        userDict = {
            "access_token" : response.get('access_token'),
            "token_type" : response.get('token_type'),
            "refresh_token" : response.get('refresh_token'),
            "expires_in" : response.get('expires_in'),
            "session_id" : sessionID
        }
    else:
        print("something went wrong when trying to create user token", response.reason)
        return HttpResponseRedirect('http://localhost:3000/')

    #Get user profile
    response2 = get("https://api.spotify.com/v1/me", headers = {
        "Authorization": "Bearer " + userDict["access_token"]})
    if response2.ok:
        response2 = response2.json()
        userDict["spotifyID"] = response2["id"]
        userDict["display_name"] = response2["display_name"]
    else:
        print("something went wrong when trying to get user profile", response2.reason)
        return HttpResponseRedirect("http://localhost:8000/rater/loginfailed")
        
    print("userDict",userDict)
    update_or_create_user(userDict)
    
    return HttpResponseRedirect('http://localhost:3000/')

def login_failed(request):
    return render(request, 'musicrater/login_failed.html')

def songExists(song):
   return Artists.objects.filter(song=song).exists()

def songRated(song, user):
    return Ratings.objects.filter(username=user,song=song).exists()

class IsAuthenticated(APIView):
    def get(self, request, session_id):
        user = get_user_by_session(session_id)
        if user.exists():
            return Response({'status': 'is_authenticated', 'display_name': user[0].display_name, 'username': user[0].spotifyID}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'is_not_authenticated'}, status=status.HTTP_200_OK)

# makes api call using the host (sessionId) and returns a reccomended track based on the passed track id
def getRec(host, track, user):
    endpoint="recommendations?limit=1&seed_genres=Pop&seed_tracks="+track
    recResponse=execute_spotify_api_request(host, endpoint)
    i=0
    while(True):
        track=recResponse['tracks'][i]
        if not songRated(track["name"], user):
            break
        else: i+=1
        if i>=len(recResponse['tracks']): return getRec(host, track["id"], user)
    return {'song':track["name"],
                    'key':track["id"],
                        'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                        'artist': track["artists"][0]["name"],
                        'call':"Recomendation",
                        'exists': songExists(track["name"])}
    

class Recomendation(APIView):
    def get(self, request, sessionId, trackId):
        user=SpotifyUsers.objects.get(session_id=sessionId).spotifyID
        rec = getRec(sessionId, trackId, user)
        return Response({'newSong':rec}, status=status.HTTP_200_OK)
        
class TopSongs(APIView):
    def get(self, request, session_id):
        user=SpotifyUsers.objects.get(session_id=session_id).spotifyID
        endpoint='me/top/tracks'
        response=execute_spotify_api_request(session_id, endpoint)
        tracks=[]
        if len(response["items"])<5:
            numTopSongs=len(response["items"])
        else: 
            numTopSongs=5
        numOther= 5- len(response["items"])
        for track in response["items"][:numTopSongs]:
            if not songRated(track["name"], user):
                tracks.append({'song':track["name"],
                            'key':track["id"],
                                'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                                'artist': track["artists"][0]["name"],
                                'call':"Top Played Song",
                                'exists': songExists(track["name"])}) #associating songs with first listed artist (even if multiple artists)
            else: tracks.append(getRec(session_id, track["id"], user))
            tracks.append(getRec(session_id, track["id"], user))
        if numOther>0:
            endpoint="playlists/37i9dQZF1DX0b1hHYQtJjp/tracks?offset=0&limit="+str(numOther*2)
            otherResponse=execute_spotify_api_request(session_id, endpoint)
            other=otherResponse["items"]
            for i in other:
                track=i["track"]
                if not songRated(track["name"], user):
                    tracks.append({'song':track["name"],
                                    'key':track["id"],
                                    'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                                    'artist': track["artists"][0]["name"],
                                    'call':"Just Good Music",
                                    'exists': songExists(track["name"])}) 
                else: tracks.append(getRec(session_id, track["id"], user))
                
                
        return Response({'songs':tracks}, status=status.HTTP_200_OK)

class UserRatings(APIView):
    def get(self, request, spotifyID):
        ratings= Ratings.objects.filter(username=spotifyID)
        res=[]
        for r in ratings:
            rating=r.for_ratings() 
            rating["track"]=Artists.objects.get(song=rating["song"]).trackId
            res.append(rating)
        print(ratings)
        return Response(res, status=status.HTTP_200_OK)

class RatingsSummary(APIView):
    def getAvgRating(self,song):
        avg=0
        ratings=Ratings.objects.filter(song=song)
        count=ratings.count()
        if not count: return None
        for r in ratings:
            avg+=(1/count)* r.rating
        return avg
        
    def get(self, request, spotifyID):
        res=[]
        songs=Artists.objects.all()
        for song in songs:
            try:
                r=Ratings.objects.get(song=song.song, username=spotifyID).rating
                id_=Ratings.objects.get(song=song.song, username=spotifyID).id
            except:
                r=None
                id_=None
            trackId=Artists.objects.get(song=song.song).trackId
            if trackId: url="https://open.spotify.com/embed/track/"+trackId+"?utm_source=generator"
            else: url=None
            res.append({
                'url':url,
                'song': song.song,
                'artist':song.artist,
                'rating': r,
                'average': self.getAvgRating(song.song),
                'key':id_
            })
        return Response(res, status=status.HTTP_200_OK)


# delete song w given trackID if no ratings for that song exist
class DeleteSong(APIView):
    def get(self, request, trackId):
        inst = Artists.objects.get(trackId=trackId)
        ratings=Ratings.objects.filter(song=inst.song)
        count=ratings.count()
        if count==0:
            inst.delete() 
        return Response({'status': 'deleted'}, status=status.HTTP_200_OK)
    