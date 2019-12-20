//Path
const path = require("path");
// Data Utilities
const p = require("../utilities/paths");

const filePath = path.join(__dirname, "../db", p.movieJSON);
console.log(filePath);

let movies = require(filePath);

const h = require("../helpers/index.helper");

// GET movies
const getMovies = () => {
    return new Promise((resolve, reject) => {
        // Check if w have any movie data
        if (movies.length === 0) {
            reject({
                message: "No movies at this time",
                status: 202
            });
        }
        resolve(movies).catch(err => reject(err));
    });
};

// GET one movie
const getMovie = imdbid => {
    return new Promise((resolve, reject) => {
        // We use the helper to check the data is present in the array
        h.inArray(movies, imdbid)
            .then(movie => resolve(movie))
            .catch(err => reject(err));
    });
};

// POST Movie
const createMovie = newMovie => {
    return new Promise((resolve, reject) => {
        const date = {
            created_at: h.dateTime(),
            updated_at: h.dateTime()
        };
        // We build our query
        newMovie = { ...date, ...newMovie };
        // We add t the array
        movies.push(newMovie);
        // Helper write to JSON the data to file
        h.writeJson(filePath, movies);
        // Resolve if ok Reject with error if wrong
        resolve(newMovie).catch(err => reject(err));
    });
};

module.exports = {
    getMovies,
    getMovie,
    createMovie
};
