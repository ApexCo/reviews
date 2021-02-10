const db = require('../../database2/index.js');

let query = `
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
  WHERE homes.id =
`;
const get = (id, callback) => {
  query = query.concat(' ', String(id), ';');
  db.query(query, callback);
};

module.exports = get;

