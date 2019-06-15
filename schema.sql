drop database if exists project3db;

create database project3db;

use project3db;

CREATE TABLE User (
 
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password INT NOT NULL,
  PRIMARY KEY (email)
);



