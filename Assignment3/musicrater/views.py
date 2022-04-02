from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Users, Artists, Ratings, Emojis
from requests import Request, post
from rest_framework.views import APIView
from .credentials import REDIRECT_URI, CLIENT_SECRET, CLIENT_ID
from rest_framework.response import Response
from rest_framework import status
from .util import *

def index(request):
    return render(request, 'musicrater/index.html')
    
def register(request):
    if request.method=='POST':
        if request.POST.get('name') and request.POST.get('pwd'):
            try:
                usr = Users.objects.get(username=request.POST.get('name'))
                return render(request, 'musicrater/index.html', {
                        'error_message': "User already exists.",
                    })
            except:
                u=Users()
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
                Users.objects.get(username=name)
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
            
        
    return HttpResponseRedirect('/rater')

class AuthURL(APIView):
    def get(self, request, fornat=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)


def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    if not request.session.exists(request.session.session_key):
        request.session.create()

    update_or_create_user_tokens(
        request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return HttpResponseRedirect('/rater')

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(
            self.request.session.session_key)
        return Response({'status': is_authenticated}, status=status.HTTP_200_OK)



