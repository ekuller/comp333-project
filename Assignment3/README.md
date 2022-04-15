# COMP333 Homework 3

## Installing and Accessing The App

1. Start a Python virtual environment and activate it. In the shell, type

```
python3 -m venv my-venv
source my-venv/bin/activate
```

2. Make sure you are in the Assignment3 directory in the comp333-project repository

3. Install Django and required modules in your virtual environment, load the data, and run the backend for our app.

```
pip3 install Django
pip3 install django-cors-headers
pip3 install djangorestframework
pip3 install requests
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

4. In a second terminal change your directory to Assignment3/frontend and activate my-venv. Install the necessary packages/dependencies.

```
source ../my-venv/bin/activate
npm install
```

5. Start the frontend

```
npm start
```

6. Go to [http://localhost:3000/](http://localhost:3000/) to access the app

7. Login with the following Spotify account: Email -- `comp333test@aol.com`; Password -- `software1!`.

## Features

Our app is connected to Spotify. It uses the Spotify api to recommend tracks specifically for a logged in user. You must log in with a Spotify account to access our app. Because our app is in development mode Spotify limits the number of accounts that can be used with our app. Thus, only specified accounts can be used to login with our app. Please use the provided Spotify account to test our app. If you want to experience the app with your Spotify account contact us with the email linked to your Spotify account and we can authorize your account.

### CRUD

C - Songs and their corresponding artist are added to the database when they are rated by any user for the first time. Ratings are added every time a user rates a song.

R - In the "Your Ratings" tabs a user can see their rated songs. In the "Social" tab a user can see all songs that have been rated by any user.

U - The title and artist of songs that have been created with the "Rate Other Songs" tab can be updated in the "Your Ratings" tab with the "Edit Song" button. Note this does not modify the title of that song for all users (unless you are the only user who has rated that song). You can modify your ratings in the "Your Ratings" tab.

D - Delete a rating in the "Your Ratings" tab. If you are the only user who has a rating for the given song, the song and artist will be deleted from the database.

### Big Feature

We have connected with a third party app (Spotify). With this connection we can provide personalized recommendations for our users and allow them to play songs using the songs' `trackId` and Spotify iFrames. We also use Spotify to authenticate users.
