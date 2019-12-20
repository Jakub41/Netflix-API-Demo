const config = require("../config/config");

// Movies file JSON
const movieJSON = config.moviesDB;
// Reviews file JSON
const reviewJSON = config.reviewsDB;

module.exports = {
    movieJSON,
    reviewJSON
};
