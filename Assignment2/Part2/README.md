# COMP333 Homework 2

## Problem 2

### (a) Implement the database schema described per problem 1

1. Start a Python virtual environment and activate it. In the shell, type

```
python3 -m venv my-venv
source my-venv/bin/activate
```

2. Make sure you are in the Assignment2/Part2 directory in the comp333-project repository

3. Install Django in your virtual environment, load the data, and run our app.

```
pip3 install Django
python3 manage.py loaddata musicrater/data.json
python3 manage.py runserver
```

4. Go to [http://127.0.0.1:8000/rater/](http://127.0.0.1:8000/rater/) to access the app

### (b) Extend the web app by adding a new table
#### Notes on Part b:
We have added a table that stores users' reactions to songs represented by emojis. With the UI you can retrieve a list of songs that have been reacted to with a certain emoji along with the percent of reactions to that song that included the given emoji.
