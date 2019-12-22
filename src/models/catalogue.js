//Path
const path = require("path");
// Data Utilities
const p = require("../utilities/paths");

const filePath = path.join(__dirname, "../db", p.movieJSON);
console.log(filePath);

let movies = require(filePath);

const h = require("../helpers/index.helper");

// GET movies
const searchInCatalogue = (t) => {
    return new Promise((resolve, reject) => {
        let movieByTitle = movies.filter(t => t.title === title);
        return movieByTitle;
    });
};

module.exports = { searchInCatalogue };
