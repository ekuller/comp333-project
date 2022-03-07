from django.contrib import admin

# Register your models here.

from .models import Users, Artists, Ratings, Emojis

admin.site.register(Users)
admin.site.register(Artists)
admin.site.register(Emojis)


class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id','username','song','rating')

admin.site.register(Ratings, RatingsAdmin)
