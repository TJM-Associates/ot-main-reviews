DROP DATABASE IF EXISTS review;

CREATE DATABASE review;

USE review;

DROP IF TABLE EXISTS users; 
DROP IF TABLE EXISTS reviews; 



CREATE TABLE users (
    user_id int NOT NULL SERIAL PRIMARY KEY,
    user_name varchar(30) NOT NULL,
    location TEXT NOT NULL,
    number_of_reviews int NOT NULL,
    profile_picture VARCHAR(300),
    vip_status BOOLEAN
);

CREATE TABLE reviews (
    id int NOT NULL SERIAL PRIMARY KEY,
    overall_rating smallint NOT NULL,
    food_rating smallint NOT NULL,
    service_rating smallint NOT NULL,
    ambience_rating smallint NOT NULL,
    comment TEXT NOT NULL,
    r_id VARCHAR(50) NOT NULL,
    u_id int NOT NULL,
    date_dined date NOT NULL,
    FOREIGN KEY (u_id)
        REFERENCES users (user_id) 
);

