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
  reviewDate      DATE NOT NULL,
  comment         VARCHAR(100),
  cleanliness     INT NOT NULL,
  accuracy        INT NOT NULL,
  communication   INT NOT NULL,
  locationRating  INT NOT NULL,
  checkin         INT NOT NULL,
  valueRating     INT NOT NULL,

  FOREIGN KEY (homeID) REFERENCES Homes(id),
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE OwnerResponse (
  id            SERIAL PRIMARY KEY,
  reviewID      INT NOT NULL,
  responseDate  DATE NOT NULL,
  comment       VARCHAR(100),

  FOREIGN KEY (reviewID) REFERENCES reviews(id)
);
