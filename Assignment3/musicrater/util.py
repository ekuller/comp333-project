from .models import SpotifyUsers
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get, session


BASE_URL = "https://api.spotify.com/v1/me/"


def get_user(userID):
    user = SpotifyUsers.objects.filter(spotifyID=userID)
    if user.exists():
        return user[0]
    else:
        return None


def update_or_create_user(usrD):
    if "spotifyID" in usrD:
        user = get_user(usrD["spotifyID"]) 
        usrD["expires_in"] = timezone.now() + timedelta(seconds=usrD["expires_in"]) #UTC time zone
        print("util update or create user",usrD)
        if user: 
            user.created_at = timezone.now()
            user.access_token = usrD["access_token"]
            user.refresh_token = usrD["refresh_token"]
            user.expires_in = usrD["expires_in"]
            user.token_type = usrD["token_type"]
            user.session_id = usrD["session_id"]
            user.save(update_fields=['created_at','access_token',
                                    'refresh_token', 'expires_in', 'token_type', "session_id"])
        else:
            user = SpotifyUsers(spotifyID=usrD["spotifyID"], display_name = usrD["display_name"],
            refresh_token=usrD["refresh_token"],access_token= usrD["access_token"], 
            expires_in=usrD["expires_in"], token_type=usrD ["token_type"], session_id=usrD["session_id"])
            user.save()
    else:
        print("User login fails")
        return 

def get_user_by_session(session_id):
    user = SpotifyUsers.objects.filter(session_id=session_id)
    if user.exists():
        if user[0].expires_in <= timezone.now():
            refresh_spotify_token(user[0].spotifyID)
    return user



def refresh_spotify_token(spotifyID):
    refresh_token = get_user(spotifyID).refresh_token
    session_id = get_user(spotifyID).session_id
    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()
    print("myresponse", response.get('refresh_token'))
    if response.get('refresh_token'):
        refresh_token = response.get('refresh_token')
    userDict = {
        "spotifyID" : spotifyID,
        "access_token" : response.get('access_token'),
        "refresh_token" : refresh_token,
        "expires_in" : response.get('expires_in'),
        "token_type" : response.get('token_type'),
        "session_id" : session_id
    }
    print("refresh_spotify_token",userDict)
    update_or_create_user(userDict)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    tokens = get_user_by_session(session_id)[0]
    headers = {'Content-Type': 'application/json',
               'Authorization': "Bearer " + tokens.access_token}

    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)

    response = get(BASE_URL + endpoint, {}, headers=headers)
    print(response)
    try:
        return response.json()
    except:
        return {'Error': 'Issue with request'}
