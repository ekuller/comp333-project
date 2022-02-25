Create database named music-db.
```sql
CREATE DATABASE `music-db`;
```

Identify that we want to use this database for future commands.
```sql
USE `music-db`;
```

Create the desired 3 tables with their respective primary keys.
```sql
CREATE TABLE `users` (`username` VARCHAR(255), password TEXT, PRIMARY KEY (`username`));
CREATE TABLE `ratings` (`id` INT, username TEXT, song TEXT, rating INT, PRIMARY KEY (`id`));
CREATE TABLE `artists` (`song` VARCHAR(255), artist TEXT, PRIMARY KEY (`song`));
```
Into each table add the given rows.
```sql
INSERT INTO users (username, password) VALUES ('Amelia-Earhart', 'Youaom139&yu7'), ('Otto', 'StarWars2\*');
INSERT INTO ratings (id, username, song, rating) VALUES
(1,'Amelia-Earhart','Freeway', 3),
(2,'Amelia-Earhart','Days of Wine and Roses', 4),
(3,'Otto','Days of Wine and Roses', 5),
(4,'Amelia-Earhart','These Walls', 4);
INSERT INTO artists (song, artist) VALUES
('Freeway','Aimee Mann'),
('Days of Wine and Roses','Bill Evans'),
('These Walls','Kendrick Lamar');
```
