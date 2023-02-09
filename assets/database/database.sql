DROP DATABASE IF EXISTS Neflis;
CREATE DATABASE IF NOT EXISTS Neflis;
USE Neflis;

CREATE TABLE  movies (
    id int NOT NULL,
    title VARCHAR(255) NOT NULL,
    language CHAR(2) NOT NULL,
    description TEXT NOT NULL,
    poster_path VARCHAR(255) NOT NULL,
    release_date DATE NULL,
    vote_average FLOAT NOT NULL,    
    vote_count INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    rol ENUM('A','U')  NOT NULL,  
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,  
    PRIMARY KEY (id)
);

CREATE TABLE list_user_movies (
    id INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES users (id)
);

CREATE TABLE movies_in_list (
    id INT NOT NULL AUTO_INCREMENT,
    id_list INT NOT NULL,
    id_movie INT NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (id_list) REFERENCES list_user_movies (id),
    FOREIGN KEY (id_movie) REFERENCES movies (id)
);

CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_movie INT NOT NULL,
    text text(500) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_movie) REFERENCES movies (id)
);

CREATE TABLE likes (
    id INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_movie INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_user) REFERENCES users (id),
    FOREIGN KEY (id_movie) REFERENCES movies (id)
);


