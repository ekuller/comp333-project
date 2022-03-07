from django.contrib import admin

# Register your models here.

from .models import Users, Artists, Ratings, EmojiReactions

admin.site.register(Users)
admin.site.register(Artists)
admin.site.register(EmojiReactions)


class RatingsAdmin(admin.ModelAdmin):
    list_display = ('id','username','song','rating')

admin.site.register(Ratings, RatingsAdmin)
