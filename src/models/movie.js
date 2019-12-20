//Path
const path = require("path");
// Data Utilities
const p = require("../utilities/paths");

const filePath = path.join(__dirname, "../db", p.movieJSON);
console.log(filePath)

let movies = require(filePath);

const h = require("../helpers/index.helper");

// GET movies
const getMovies = () => {
    return new Promise((resolve, reject) => {
        // Check if w have any products data
        if (movies.length === 0) {
            reject({
                message: "No movies at this time",
                status: 202
            });
        }
        resolve(movies).catch(err => reject(err));
    });
};

module.exports = {
    getMovies,
};
