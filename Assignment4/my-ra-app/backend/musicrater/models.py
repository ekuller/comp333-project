from django.db import models

class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    artist= models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    rating = models.IntegerField()
    song = models.CharField(max_length=100)
    class Meta:
        verbose_name_plural = "Ratings"
    def __str__(self):
        return (self.user + " gave " + self.song+ " a " + str(self.rating))
    
    
    
    
    
