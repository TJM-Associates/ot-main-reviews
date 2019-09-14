DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

\c review; 

DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reviews;

CREATE TABLE restaurants (
    r_id INTEGER PRIMARY KEY,
    restaurant_name varchar(10) NOT NULL
);

CREATE TABLE reviews (
    user_name varchar(30) NOT NULL,
    city TEXT NOT NULL,
    number_of_reviews int NOT NULL,
    profile_picture VARCHAR(300),
    vip_status BOOLEAN,
    overall_rating smallint NOT NULL,
    food_rating smallint NOT NULL,
    service_rating smallint NOT NULL,
    ambience_rating smallint NOT NULL,
    comment TEXT NOT NULL,
    r_id INTEGER NOT NULL,
    date_dined varchar(20) NOT NULL,
    FOREIGN KEY (r_id) REFERENCES restaurants (r_id)
);

