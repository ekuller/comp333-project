# Generated by Django 4.0.3 on 2022-03-07 19:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('musicrater', '0002_emojis_alter_artists_options_alter_ratings_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ratings',
            name='emoji',
        ),
        migrations.AddField(
            model_name='emojis',
            name='song',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='musicrater.artists'),
        ),
        migrations.AddField(
            model_name='emojis',
            name='username',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='musicrater.users'),
        ),
        migrations.AlterField(
            model_name='emojis',
            name='celebration',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='emojis',
            name='happy',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='emojis',
            name='sad',
            field=models.BooleanField(default=False),
        ),
    ]
