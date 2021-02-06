const fs = require('fs');
const faker = require('faker');

//
// Generate user data
//
const numUserRecords = 200;
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
  writeUsers.write('profilepicture,name\n', 'utf8');

  function writeAllUserData(writer, encoding, callback) {
    let i = numUserRecords;
    function write() {
      let ok = true;
      do {
        i -= 1;
        const gender = sex();
        const profilePicture = picture(gender);
        const name = faker.name.firstName(gender);
        const data = `${profilePicture},${name}\n`;
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
const numHomeRecords = 200;
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
const numReviewRecords = 200;
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
        const randMonth = Math.floor(Math.random() * (months.length-1) + 1);
        const userID = Math.floor(Math.random() * numUserRecords + 1);
        const date = `${months[randMonth]} ${randMonth < 6 ? 2020 : 2019}`
        const comment = faker.lorem.sentences();
        const cleanliness = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const accuracy = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const communication = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const location = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const checkin = (Math.random() * (5.01 - 3) + 3).toFixed(1);
        const value = (Math.random() * (5.01 - 3) + 3).toFixed(1);

        const data = `${homeID},${userID},${date},${comment},${cleanliness},${accuracy},${communication},${location},${checkin},${value}\n`;

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

// Run all data generation functions
generateUserData();
generateHomeData();
generateReviewData();

// for (let i = 1; i <= 100; i += 1) {
//   const listing = {
//     _id: i,
//     averageRating: null,
//     reviewCount: Math.floor(Math.random() * (50 - 10 + 1) + 10),
//     ratings: [
//       ['Cleanliness', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//       ['Accuracy', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//       ['Communication', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//       ['Location', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//       ['Check-in', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//       ['Value', (Math.random() * (5.01 - 3) + 3).toFixed(1)],
//     ],
//     reviews: [],
//   };

//   const lr = listing.ratings;
//   const sum = Number(lr[0][1]) + Number(lr[1][1]) + Number(lr[2][1])
//     + Number(lr[3][1]) + Number(lr[4][1]) + Number(lr[5][1]);
//   const ratingCategories = 6;

//   const average = (sum / ratingCategories).toFixed(2);
//   listing.averageRating = average;

//   const month = {
//     12: 'January',
//     11: 'February',
//     10: 'March',
//     9: 'April',
//     8: 'May',
//     7: 'June',
//     6: 'July',
//     5: 'August',
//     4: 'September',
//     3: 'October',
//     2: 'November',
//     1: 'December',
//   };

//   const sex = () => {
//     if (Math.random() < 0.5) {
//       return 1;
//     }
//     return 0;
//   };

//   const picture = (gender) => `https://airbnbfec.s3-us-west-1.amazonaws.com/${gender}/${Math.floor(Math.random() * (40 - 1 + 1) + 1)}.webp`;

//   const ownerGender = sex();
//   const ownerProfilePicture = picture(ownerGender);
//   const ownerName = faker.name.firstName(ownerGender);

//   for (let j = 1; j <= listing.reviewCount; j += 1) {
//     const date = `${j < 13 ? month[j] : 'January'} ${j < 13 ? 2020 : 2019}`;
//     const gender = sex();
//     const name = faker.name.firstName(gender);
//     const profilePicture = picture(gender);
//     const ownerComment = Math.random() < 0.2 ? faker.lorem.sentences() : null;

//     listing.reviews.push({
//       _id: j,
//       profilePicture,
//       name,
//       date,
//       comment: faker.lorem.sentences(),
//       ownerProfilePicture: ownerComment ? ownerProfilePicture : null,
//       ownerName: ownerComment ? ownerName : null,
//       ownerCommentDate: ownerComment ? date : null,
//       ownerComment,
//     });
//   }

//   seed.push(listing);
// }

// db.Review.insertMany(seed, (err) => {
//   if (err) {
//     throw new Error(err);
//   } else {
//     db.connection.close();
//   }
// });
