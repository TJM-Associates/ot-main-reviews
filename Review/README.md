# IMWY-LABS

> Review Component for a service based company

## Related Projects

  - https://github.com/lmwy-labs/right-reservations
  - https://github.com/lmwy-labs/main-menu
  - https://github.com/lmwy-labs/main-gallery

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> 1. npm run seed to seed data
      DO THESE BEFORE RUNNING SEED SCRIPT:
        A) You will have to change the mySQL login data to whatever password (or no password) you    set for your root
        B) Create the database by writing: CREATE DATABASE reviewDB;
        C) Inject the schema.sql file by typing: mysql -u root -p < db/schema.sql;
        D) Run script.

  2. npm run build to start webpack
  3. npm run test to observe test coverage
  4. npm run start to initiate server

  This is a review module for a service based company to allow potential visitors/diners/etc... to read reviews.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## RESTful CRUD API 
- CREATE 
	- app.get("api/restaurants/:rid/getReviews")
- READ
	- app.post("api/restaurants/:rid/getReviews")
- UPDATE
	- app.update("api/restaurants/:rid/getReviews")
- DELETE 
	- app.delete("api/restaurants/:rid/getReviews")

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

