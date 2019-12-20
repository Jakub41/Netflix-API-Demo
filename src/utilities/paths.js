const config = require("../config/config");

// Movies file JSON
const movieJSON = config.db;
const reviewJSON = config.reviewsDB;

console.log(movieJSON)
console.log(reviewJSON)

module.exports = {
    movieJSON,
    reviewJSON
};
