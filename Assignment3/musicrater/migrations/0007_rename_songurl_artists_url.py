# Generated by Django 4.0.3 on 2022-04-09 22:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicrater', '0006_artists_songurl'),
    ]

    operations = [
        migrations.RenameField(
            model_name='artists',
            old_name='songUrl',
            new_name='url',
        ),
    ]