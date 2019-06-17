drop database if exists project3db;

create database project3db;

use project3db;

CREATE TABLE Users (
 
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  PRIMARY KEY (email)
);



