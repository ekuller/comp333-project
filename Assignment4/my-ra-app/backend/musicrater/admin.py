from django.contrib import admin

# Register your models here.

from .models import SpotifyUsers, Artists, Ratings, Emojis

admin.site.register(SpotifyUsers)
admin.site.register(Artists)
admin.site.register(Emojis)

class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id','username','song','rating')

admin.site.register(Ratings, RatingsAdmin)
