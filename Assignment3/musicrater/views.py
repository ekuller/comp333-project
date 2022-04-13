from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .models import SpotifyUsers, Artists, Ratings, Emojis
from requests import post, get
from rest_framework.views import APIView
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.response import Response
from rest_framework import status
from .util import *

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


def rate(request):
    sessionID = request.POST.get('state')
    spotifyId= get_user_by_session(sessionID)
    if request.method=='POST':
        if request.POST.get("rating"):
                r=Ratings()
                r.rating=request.POST.get("rating")
                r.username= spotifyId
                r.song=request.POST.get("song")
                r.save()
    HttpResponseRedirect('http://localhost:3000/')
            
        
    return HttpResponseRedirect('/rater')


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

class IsAuthenticated(APIView):
    def get(self, request, session_id):
        user = get_user_by_session(session_id)
        if user.exists():
            return Response({'status': 'is_authenticated', 'display_name': user[0].display_name}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'is_not_authenticated'}, status=status.HTTP_200_OK)

# makes api call using the host (sessionId) and returns a reccomended track based on the passed track id
def getRec(host, track):
    endpoint="recommendations?limit=1&seed_genres=Pop&seed_tracks="+track
    recResponse=execute_spotify_api_request(host, endpoint)
    track=recResponse['tracks'][0]
    print(recResponse)
    return {'song':track["name"],
                    'key':track["id"],
                        'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                        'artist': track["artists"][0]["name"],
                        'call':"Recomendation"}
    

class Recomendation(APIView):
    def get(self, request, sessionId, trackId):
        rec = getRec(sessionId, trackId)
        print(rec)
        return Response({'newSong':rec}, status=status.HTTP_200_OK)
        
class TopSongs(APIView):
    def get(self, request, session_id):
        endpoint='me/top/tracks'
        response=execute_spotify_api_request(session_id, endpoint)
        tracks=[]
        if len(response["items"])<5:
            numTopSongs=len(response["items"])
        else: 
            numTopSongs=5
        numOther= 5- len(response["items"])
        for track in response["items"][:numTopSongs]:
            tracks.append({'song':track["name"],
                        'key':track["id"],
                            'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                            'artist': track["artists"][0]["name"],
                            'call':"Top Played Song"}) #associating songs with first listed artist (even if multiple artists)
            # endpoint="recommendations?limit=1&seed_genres=Pop&seed_tracks="+track["id"]
            # recResponse=execute_spotify_api_request(session_id, endpoint)
            # track=recResponse['tracks'][0]
            # tracks.append({'song':track["name"],
            #             'key':track["id"],
            #                 'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
            #                 'artist': track["artists"][0]["name"],
            #                 'call':"Recomendation"}) #associating songs with first listed artist (even if multiple artists)
            tracks.append(getRec(session_id, track["id"]))
        if numOther>0:
            endpoint="playlists/37i9dQZF1DX0b1hHYQtJjp/tracks?offset=0&limit="+str(numOther*2)
            otherResponse=execute_spotify_api_request(session_id, endpoint)
            other=otherResponse["items"]
            for i in other:
                track=i["track"]
                tracks.append({'song':track["name"],
                                'key':track["id"],
                                'url':"https://open.spotify.com/embed/track/"+track["id"]+"?utm_source=generator",
                                'artist': track["artists"][0]["name"],
                                'call':"Just Good Music"}) 
                
                
        return Response({'songs':tracks}, status=status.HTTP_200_OK)