const config = require("../config/config");
const path = require("path");

// Movies file JSON
const movieJSON = config.moviesDB;
// Reviews file JSON
const reviewJSON = config.reviewsDB;
// Uploads directory
const uploadsDir = path.join(__dirname, config.uploads);

module.exports = {
    movieJSON,
    reviewJSON,
    uploadsDir
};
