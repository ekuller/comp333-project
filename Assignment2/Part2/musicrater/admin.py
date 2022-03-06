from django.contrib import admin

# Register your models here.

from .models import Users, Artists, Ratings

admin.site.register(Users)
admin.site.register(Artists)
admin.site.register(Ratings)
