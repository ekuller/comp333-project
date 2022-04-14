from django.db import models

class SpotifyUsers(models.Model):
    spotifyID = models.CharField(max_length=100, unique=True, primary_key=True)
    display_name = models.CharField(max_length=50, unique=False)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=300)
    access_token = models.CharField(max_length=300)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)
    session_id = models.CharField(max_length=50)
    class Meta:
        verbose_name_plural = "SpotifyUsers"
    def __str__(self):
        return self.display_name

class Artists(models.Model):
    song= models.CharField(max_length=200, primary_key=True)
    artist= models.CharField(max_length=200)
    trackId=models.CharField(max_length=200, null=True)
    class Meta:
        verbose_name_plural = "Artists"
    def __str__(self):
        return (self.song + ' -- '+ self.artist )

class Emojis(models.Model):
    id = models.AutoField(primary_key=True)
    happy = models.BooleanField(default=False)
    sad = models.BooleanField(default=False)
    celebration = models.BooleanField(default=False)
    username= models.ForeignKey(SpotifyUsers, on_delete=models.CASCADE, to_field='spotifyID', null=True)
    song=models.ForeignKey(Artists, on_delete=models.CASCADE, to_field='song', null=True)
    class Meta:
        verbose_name_plural = "Emojis"

class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    username= models.ForeignKey(SpotifyUsers, on_delete=models.CASCADE, to_field='spotifyID', null=True)
    song=models.ForeignKey(Artists, on_delete=models.CASCADE, to_field='song')
    rating=models.IntegerField(null=True)
    class Meta:
        verbose_name_plural = "Ratings"
    def __str__(self):
        return (self.username.spotifyID + " gave " + self.song.song + " a " + str(self.rating))
    def for_ratings(self):
        id_=Artists.objects.get(song=self.song.song).trackId
        artist=Artists.objects.get(song=self.song.song).artist
        print(id_)
        url="https://open.spotify.com/embed/track/"+id_+"?utm_source=generator"
        return dict(
        song =self.song.song,
        url=url,
        artist=artist,
        rating=self.rating,
        key=self.id)



    
    
    
    
    
    
