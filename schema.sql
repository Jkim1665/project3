drop database if exists project3db;

create database project3db;


CREATE TABLE User (
 
  name VARCHAR(100) NULL,
  email VARCHAR(100) NULL,
  password INT NULL,
  PRIMARY KEY (email)
);



