### Directions for creating the database and running the php app

Open XAMPP. Under Services start Apache and MySQL. Under Network enable localhost:8080. Under Volume mount /opt/lampp. Then go to the htdocs directory in the new mounted lampp directory. Paste the index.php from our Part1 directory into the aforementioned htdocs directory. Go to [localhost:8080/phpmyadmin](http://localhost:8080/phpmyadmin/). Then under SQL run the following commands in order to create the necessary database.

Create database named music_db.

```sql
CREATE DATABASE `music-db`;
```

Identify that we want to use this database for future commands.

```sql
USE `music-db`;
```

Create the desired 3 tables with their respective primary keys.

```sql
CREATE TABLE users (username VARCHAR(255), password TEXT, PRIMARY KEY (username));
CREATE TABLE artists (song VARCHAR(255), artist TEXT, PRIMARY KEY (song));
CREATE TABLE ratings (
    id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), song VARCHAR(255), rating INT,
    FOREIGN KEY (username)
    	REFERENCES users(username)
    	ON UPDATE CASCADE
    	ON DELETE CASCADE,
    FOREIGN KEY (song)
    	REFERENCES artists(song)
    	ON UPDATE CASCADE
    	ON DELETE CASCADE
);
```

Into each table add the given rows.

```sql
INSERT INTO users (username, password) VALUES ('Amelia-Earhart', 'Youaom139&yu7'), ('Otto', 'StarWars2\*');

INSERT INTO artists (song, artist) VALUES
('Freeway','Aimee Mann'),
('Days of Wine and Roses','Bill Evans'),
('These Walls','Kendrick Lamar');

INSERT INTO ratings (username, song, rating) VALUES
('Amelia-Earhart','Freeway', 3),
('Amelia-Earhart','Days of Wine and Roses', 4),
('Otto','Days of Wine and Roses', 5),
('Amelia-Earhart','These Walls', 4);
```

Visit [localhost:8080](http://localhost:8080)
