from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=200, primary_key=True)
    password = models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Users"
    def __str__(self):
        return self.username

class Artists(models.Model):
    song= models.CharField(max_length=200, primary_key=True)
    artist= models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Artists"
    def __str__(self):
        return (self.song + " - " + self.artist)

class Emojis(models.Model):
    id = models.AutoField(primary_key=True)
    happy = models.BooleanField(default=False)
    sad = models.BooleanField(default=False)
    celebration = models.BooleanField(default=False)
    username= models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username', null=True)
    song=models.ForeignKey(Artists, on_delete=models.CASCADE, to_field='song', null=True)
    class Meta:
        verbose_name_plural = "Emojis"

class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    username= models.ForeignKey(Users, on_delete=models.CASCADE, to_field='username')
    song=models.ForeignKey(Artists, on_delete=models.CASCADE, to_field='song')
    rating=models.IntegerField()
    class Meta:
        verbose_name_plural = "Ratings"
    def __str__(self):
        return (self.username.username + " gave " + self.song.song + " a " + str(self.rating))


    
    
    
    
    
    
