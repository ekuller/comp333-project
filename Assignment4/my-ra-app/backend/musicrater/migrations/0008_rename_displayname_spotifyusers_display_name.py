# Generated by Django 4.0.3 on 2022-04-10 04:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musicrater', '0007_alter_spotifyusers_access_token_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='spotifyusers',
            old_name='displayName',
            new_name='display_name',
        ),
    ]