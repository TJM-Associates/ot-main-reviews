DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

\c review; 

DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;

CREATE TABLE restaurants (
    r_id VARCHAR(50) PRIMARY KEY NOT NULL, 
    restaurant_name text NOT NULL 
);

CREATE TABLE users (
    user_id int PRIMARY KEY NOT NULL,
    user_name varchar(30) NOT NULL,
    location TEXT NOT NULL,
    number_of_reviews int NOT NULL,
    profile_picture VARCHAR(300),
    vip_status BOOLEAN
);

CREATE TABLE reviews (
    id int PRIMARY KEY NOT NULL,
    overall_rating smallint NOT NULL,
    food_rating smallint NOT NULL,
    service_rating smallint NOT NULL,
    ambience_rating smallint NOT NULL,
    comment TEXT NOT NULL,
    r_id VARCHAR(50) NOT NULL,
    u_id int NOT NULL,
    date_dined date NOT NULL,
    FOREIGN KEY (u_id) REFERENCES users (user_id),
    FOREIGN KEY (r_id) REFERENCES restaurants (r_id)
);

