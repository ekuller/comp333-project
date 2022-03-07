from django.urls import include, path
from . import views

app_name = 'musicrater'
urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.register, name='register'),
    path('reg_succ', views.reg_succ, name='reg_succ'),
    path('retrieve', views.retrieve, name='retrieve'),
]
