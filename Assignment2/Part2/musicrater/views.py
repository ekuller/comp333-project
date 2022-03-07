from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import Users, Artists, Ratings, Emojis
import time

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
                usr = Users.objects.get(username=name)
                return render(request, 'musicrater/index.html', {
                        'usr': name,
                        'user_reviews':Ratings.objects.filter(username=name)
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
            emojiNames={"😁":"happy","🥺":"sad","🥳":"celebration"}
            emoji=emojiNames[request.POST.get("emoji")]
            emoji_percentage={}
            songs= Artists.objects.values_list('song', flat=True)
            for s in songs:
                reactions=Emojis.objects.filter(song=s)
                songReactions=reactions.count()
                emojiSongCount=Emojis.objects.filter(emoji=True).count()
                emoji_percentage[s]=emojiSongCount/songReactions
            return render(request, 'musicrater/index.html', {
                'emoji_report': emoji_percentage,
                'emoji': emoji
             })
            
        
    return HttpResponseRedirect('/rater')