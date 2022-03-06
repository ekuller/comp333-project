from django.shortcuts import render
from django.http import HttpResponse
from .models import Users, Artists, Ratings


def index(request):
    if request.method=='POST':
        if request.POST.get('name') and request.POST.get('pwd'):
            u=Users()
            u.username= request.POST.get('name')
            u.password= request.POST.get('pwd')
            u.save()
    return render(request, 'musicrater/index.html')


    

            