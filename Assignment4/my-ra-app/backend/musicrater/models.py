from django.db import models

class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    artist= models.CharField(max_length=100, unique=True, primary_key=True)
    user = models.CharField(max_length=100, unique=True, primary_key=True)
    rating = models.CharField(max_length=100, unique=True, primary_key=True)
    song = models.CharField(max_length=100, unique=True, primary_key=True)
    class Meta:
        verbose_name_plural = "Ratings"
    def __str__(self):
        return (self.username.spotifyID + " gave " + self.song.song + " a " + str(self.rating))
    
    
    
    
    
