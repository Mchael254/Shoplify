
create database Shopie

use Shopie

-- create table Users (
--     userID VARCHAR(300) not null PRIMARY KEY,
--     userName VARCHAR(255) not null,
--     email VARCHAR(255) not null UNIQUE,
--     password VARCHAR(255) not null,
--     phone_no VARCHAR (250) UNIQUE, 
--     role varchar(20) DEFAULT 'customer',
--     Welcomed bit DEFAULT 0,
--     isOrder bit DEFAULT 0
-- )

select * from Users

update Users 
set role = 'admin'
where email = 'eucs@gmail.com'