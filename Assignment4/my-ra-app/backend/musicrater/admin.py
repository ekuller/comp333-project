from django.contrib import admin

# Register your models here.

from .models import Ratings


class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id','user','song','rating')

admin.site.register(Ratings, RatingsAdmin)
