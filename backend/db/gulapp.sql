DROP DATABASE IF EXISTS gulapp;
CREATE DATABASE gulapp;

\c gulapp

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  fullname VARCHAR,
  user_imgurl VARCHAR,
  phone_number VARCHAR);

CREATE TABLE news(
  news_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  title VARCHAR,
  text VARCHAR,
  news_imgurl VARCHAR,
  news_timestamp timestamp not null default CURRENT_TIMESTAMP);

CREATE TABLE item4sale(
  item_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  item4sale_imgurl VARCHAR,
  description VARCHAR,
  item_timestamp timestamp not null default CURRENT_TIMESTAMP,
  title VARCHAR,
  condition VARCHAR,
  price VARCHAR);

CREATE TABLE item4rent(
  item_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  item4rent_imgurl VARCHAR,
  description VARCHAR,
  item_timestamp timestamp not null default CURRENT_TIMESTAMP,
  title VARCHAR,
  condition VARCHAR,
  price VARCHAR);

CREATE TABLE services(
    service_id SERIAL PRIMARY KEY,
    title VARCHAR,
    description VARCHAR,
    service_imgurl VARCHAR,
    user_id INTEGER REFERENCES users,
    price VARCHAR);

CREATE TABLE survey_question(
  survey_question_id SERIAL PRIMARY KEY,
  survey_question VARCHAR,
  user_id INTEGER REFERENCES users);

CREATE TABLE survey_rating(
  survey_rating_id SERIAL PRIMARY KEY,
  survey_question_id INTEGER REFERENCES survey_question,
  user_id INTEGER REFERENCES users,
  rating_score INTEGER,
  feedback VARCHAR);

CREATE TABLE announcement(
  announcement_id SERIAL PRIMARY KEY,
  title VARCHAR,
  user_id INTEGER REFERENCES users,
  announcement VARCHAR,
  announ_timestamp timestamp not null default CURRENT_TIMESTAMP);

CREATE TABLE wrongnews(
  wrongnews_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  news_id INTEGER REFERENCES news);

CREATE TABLE rightnews(
  rightnews_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users,
  news_id INTEGER REFERENCES news);

-- CREATE TABLE comments(
--   comment_id SERIAL PRIMARY KEY,
--   concept_id INTEGER REFERENCES concepts,
--   user_id INTEGER REFERENCES users,
--   comment VARCHAR,
--   seen BOOLEAN,
--   comment_timestamp timestamp not null default CURRENT_TIMESTAMP);
