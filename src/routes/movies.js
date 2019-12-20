// Express
const express = require("express");
// Router
const router = express.Router();
// Product model
const movie = require("../models/movie");
// Validations middleware
const check = require("../middleware/index.middleware");

// GET all movies
router.get("/", check.rules, async (req, res) => {
    // Await response server
    await movie
        .getMovies()
        // Result the all Movies
        .then(movies => res.json(movies))
        // If any errors
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});
