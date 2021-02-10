const fs = require('fs');
const faker = require('faker');

//
// Generate user data
//
const numUserRecords = 2000000;
const generateUserData = function() {
  // randomly generate gender
  const sex = () => {
    if (Math.random() < 0.5) {
      return 1;
    }
    return 0;
  };

  // function to generate picture url
  const picture = (gender) => `https://airbnbfec.s3-us-west-1.amazonaws.com/${gender}/${Math.floor(Math.random() * (40 - 1 + 1) + 1)}.webp`;

  // initialize write stream
  const writeUsers = fs.createWriteStream('./data/users.csv');
  writeUsers.write('profilePicture,userName\n', 'utf8');

  function writeAllUserData(writer, encoding, callback) {
    let i = numUserRecords;
    function write() {
      let ok = true;
      do {
        i -= 1;
        const gender = sex();
        const profilePicture = picture(gender);
        const userName = faker.name.firstName(gender);

        const data = `${profilePicture},${userName}\n`;

        if (i % 50000 === 0) {
          console.log(i, ' records remaining for users')
        }

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);

      if (i > 0) {
        // had to stop early! write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

  writeAllUserData(writeUsers, 'utf-8', () => {
    writeUsers.end();
  });
}

//
// Generate home data
//
const numHomeRecords = 1000000;
const generateHomeData = function() {
  // initialize write stream
  const writeUsers = fs.createWriteStream('./data/homes.csv');
  writeUsers.write('owner\n', 'utf8');

  function writeAllUserData(writer, encoding, callback) {
    let i = numHomeRecords;
    function write() {
      let ok = true;
      do {
        i -= 1;
        const owner = Math.floor(Math.random() * numUserRecords + 1);

        const data = `${owner}\n`;

        if (i % 50000 === 0) {
          console.log(i, ' records remaining for homes')
        }

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);

      if (i > 0) {
        // had to stop early! write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

  writeAllUserData(writeUsers, 'utf-8', () => {
    writeUsers.end();
  });
}

//
// Generate review data
//
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',' September', 'October', 'November', 'December'];
const numReviewRecords = 30000000;
const generateReviewData = function() {
  // initialize write stream
  const writeUsers = fs.createWriteStream('./data/reviews.csv');
  writeUsers.write('homeID,userID,date,comment,cleanliness,accuracy,communication,location,checkin,value\n', 'utf8');

  function writeAllUserData(writer, encoding, callback) {
    let i = numReviewRecords;
    function write() {
      let ok = true;
      do {
        i -= 1;
        const homeID = Math.floor(Math.random() * numHomeRecords + 1);
        const userID = Math.floor(Math.random() * numUserRecords + 1);
        const randMonth = Math.floor(Math.random() * (months.length-1) + 1);
        const date = `${months[randMonth]} ${randMonth < 6 ? 2020 : 2019}`;
        const comment = faker.lorem.sentences();
        const cleanliness = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const accuracy = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const communication = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const location = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const checkin = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const value = (Math.random() * (5.01 - 3) + 3).toFixed(1);

        const data = `${homeID},${userID},${date},${comment},${cleanliness},${accuracy},${communication},${location},${checkin},${value}\n`;

        if (i % 50000 === 0) {
          console.log(i, ' records remaining for reviews')
        }

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);

      if (i > 0) {
        // had to stop early! write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

  writeAllUserData(writeUsers, 'utf-8', () => {
    writeUsers.end();
  });
}

//
// Generate owner response data
//
const numOwnerResponseRecords = 3000000;
const generateOwnerResponseData = function() {
  // initialize write stream
  const writeUsers = fs.createWriteStream('./data/ownerResponse.csv');
  writeUsers.write('reviewID,date,comment\n', 'utf8');

  function writeAllUserData(writer, encoding, callback) {
    let i = numHomeRecords;
    function write() {
      let ok = true;
      do {
        i -= 1;
        const reviewID = Math.floor(Math.random() * numReviewRecords + 1);
        const randMonth = Math.floor(Math.random() * (months.length-1) + 1);
        const date = `${months[randMonth]} ${randMonth < 6 ? 2020 : 2019}`;
        const comment = faker.lorem.sentences();

        const data = `${reviewID},${date},${comment}\n`;

        if (i % 50000 === 0) {
          console.log(i, ' records remaining for owner responses')
        }

        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);

      if (i > 0) {
        // had to stop early! write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }

  writeAllUserData(writeUsers, 'utf-8', () => {
    writeUsers.end();
  });
}

//
// Run all data generation functions
//
generateUserData();
// generateHomeData();
// generateReviewData();
// generateOwnerResponseData();
