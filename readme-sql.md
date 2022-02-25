CREATE DATABASE `music-db`;

USE `music-db`;

CREATE TABLE `users` (`username` VARCHAR(255), password TEXT, PRIMARY KEY (`username`));
CREATE TABLE `ratings` (`id` INT, username TEXT, song TEXT, rating INT, PRIMARY KEY (`id`));
CREATE TABLE `artists` (`song` VARCHAR(255), artist TEXT, PRIMARY KEY (`song`));

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
