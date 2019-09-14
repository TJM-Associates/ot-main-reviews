DROP KEYSPACE IF EXISTS review;
CREATE KEYSPACE review with replication = {'class':'SimpleStrategy', 'replication_factor': '1'};

use review; 

CREATE TABLE restaurants (
    r_id number, 
    restaurant_name text 
)

CREATE TABLE users (
    user_id uuid,
    username text,
    location text,
    number_of_reviews number,
    profile_picture text,
    vip_status boolean
    PRIMARY KEY (user_id)
);

CREATE TABLE reviews (
    id uuid,
    overall_rating smallint,
    food_rating smallint,
    service_rating smallint,
    ambience_rating smallint,
    comment text,
    r_id text,
    u_id number,
    date_dined date,
    PRIMARY KEY (id)
);
