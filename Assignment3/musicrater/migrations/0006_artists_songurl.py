# Generated by Django 4.0.3 on 2022-04-09 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('musicrater', '0005_spotifytoken'),
    ]

    operations = [
        migrations.AddField(
            model_name='artists',
            name='songUrl',
            field=models.CharField(default='a', max_length=500),
            preserve_default=False,
        ),
    ]
