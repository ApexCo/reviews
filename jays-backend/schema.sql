DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;
\connect reviews;

CREATE TABLE Users (
  id                SERIAL PRIMARY KEY,
  profilePicture    VARCHAR(200),
  userName          VARCHAR(50)
);

CREATE TABLE Homes (
  id              SERIAL PRIMARY KEY,
  ownerID         INT NOT NULL,

  FOREIGN KEY (ownerID) REFERENCES Users(id)
);

CREATE TABLE Reviews (
  id              SERIAL PRIMARY KEY,
  homeID          INT NOT NULL,
  userID          INT NOT NULL,
  reviewDate      VARCHAR(15),
  comment         VARCHAR(500),
  cleanliness     FLOAT NOT NULL,
  accuracy        FLOAT NOT NULL,
  communication   FLOAT NOT NULL,
  locationRating  FLOAT NOT NULL,
  checkin         FLOAT NOT NULL,
  valueRating     FLOAT NOT NULL,

  FOREIGN KEY (homeID) REFERENCES Homes(id),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE OwnerResponse (
  id            SERIAL PRIMARY KEY,
  reviewID      INT NOT NULL,
  responseDate  VARCHAR(15),
  comment       VARCHAR(500),

  FOREIGN KEY (reviewID) REFERENCES reviews(id)
);


COPY users(profilePicture, userName)
FROM '/Users/jaydkumar/HackReactor/SDC/reviews/jays-backend/data/users.csv'
DELIMITER ','
CSV HEADER;


COPY homes(ownerID)
FROM '/Users/jaydkumar/HackReactor/SDC/reviews/jays-backend/data/homes.csv'
DELIMITER ','
CSV HEADER;


COPY reviews(homeID, userID, reviewDate, comment, cleanliness, accuracy, communication, locationRating, checkin, valueRating)
FROM '/Users/jaydkumar/HackReactor/SDC/reviews/jays-backend/data/reviews.csv'
DELIMITER ','
CSV HEADER;


COPY ownerResponse(reviewID, responseDate, comment)
FROM '/Users/jaydkumar/HackReactor/SDC/reviews/jays-backend/data/ownerResponse.csv'
DELIMITER ','
CSV HEADER;


SELECT
  homes.id as homeID,
  homes.ownerID as ownerID,
  reviews.reviewDate as reviewDate,
  reviews.userID as reviewUserID,
  reviews.comment as reviewComment,
  ownerresponse.responseDate as responseDate,
  ownerresponse.comment as ownerComment
FROM homes
  JOIN reviews on homes.id = reviews.homeID
  FULL OUTER JOIN ownerresponse on reviews.id = ownerresponse.reviewID
WHERE homes.id = 1;
