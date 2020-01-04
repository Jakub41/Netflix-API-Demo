//Path
const path = require("path");
// Data Utilities
const p = require("../utilities/paths");

const filePath = path.join(__dirname, "../db", p.movieJSON);
console.log(filePath);

let movies = require(filePath);

let reviews = require(path.join(__dirname, "../db", p.reviewJSON));
const h = require("../helpers/index.helper");

// Sort
const _ = require("lodash");
const { sortMovie } = require("../utilities/sortMovie");

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

// PUT Update movie
const updateMovie = (imdbid, newMovie) => {
    return new Promise((resolve, reject) => {
        h.inArray(movies, imdbid)
            .then(movie => {
                const index = movies.findIndex(b => b.imdbID === imdbid);
                console.log("INDEX ", index);
                let updateId = { imdbID: movie.imdbID };
                console.log("updateID ", updateId);
                const date = {
                    created_at: movie.created_at,
                    // Update only the updated at date time
                    updated_at: h.dateTime()
                };
                // Merging new data with old data
                let updatedMovie = { ...movies[index], ...newMovie };
                movies[index] = { ...updateId, ...updatedMovie, ...date };
                h.writeJson(filePath, movies);
                resolve(movies[index]);
            })
            .catch(err => reject(err));
    });
};

// DELETE a Movie
const deleteMovie = imdbid => {
    return new Promise((resolve, reject) => {
        // Check if it is part of an array
        h.inArray(movies, imdbid)
            // Filter the movie id to delete and write
            .then(() => {
                movies = movies.filter(m => m.imdbID !== imdbid);
                h.writeJson(filePath, movies);
                resolve();
            })
            .catch(err => reject(err));
    });
};

// Get movies list sorted by review rate
const getSortedMoviesByRate = sort_ascending => {
    return new Promise(async (resolve, reject) => {
        // Check if w have any movie data
        if (movies.length === 0) {
            reject({
                message: "No movies at this time",
                status: 202
            });
        }

        movies = movies.map(function(m) {
            // default values
            let movieReviews = [],
                avgRate = 0;

            // check if movie has reviews
            movieReviews = reviews.filter(r => r.imdbID === m.imdbID);

            if (movieReviews.length > 0) {
                avgRate = Math.round(
                    _.sumBy(movieReviews, r => parseInt(r.rate)) /
                        movieReviews.length
                );
            }

            m = Object.assign(
                {
                    reviews: movieReviews,
                    rate: avgRate
                },
                m
            );

            return m;
        });

        // filter movies with no review
        movies = movies.filter(m => m.reviews.length > 0);

        // sort by rating - descending by default
        // Higher rate AVG first
        movies = sortMovie(movies, [
            // if ASC === tue reversed sort from lower rates AVG
            sort_ascending === true
                ? { asc: m => m.rate }
                : { desc: m => m.rate }
        ]);

        resolve(movies).catch(err => reject(err));
    });
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    getSortedMoviesByRate
};
