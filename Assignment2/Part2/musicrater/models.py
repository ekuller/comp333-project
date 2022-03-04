from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=200, primary_key=True)
    password = models.CharField(max_length=200)

class Artists(models.Model):
    song= models.CharField(max_length=200, primary_key=True)
    artist= models.CharField(max_length=200)

class Ratings(models.Model):
    id = models.AutoField(primary_key=True)
    username= models.ForeignKey(Users, on_delete=models.CASCADE)
    song=models.ForeignKey(Artists, on_delete=models.CASCADE)
    rating=models.IntegerField()