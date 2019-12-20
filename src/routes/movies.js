// Express
const express = require("express");
// Router
const router = express.Router();
// Movie model
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

// GET one movie
router.get("/:imdbid", check.rules, async (req, res) => {
    const imdbid = req.params.imdbid;
    await movie
        .getMovie(imdbid)
        .then(movie => res.json(movie))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

// POST create new movie
router.post("/", check.createMovie(), check.rules, async (req, res) => {
    // movies
    const movies = await movie.getMovies();
    // Check unique ID
    const idCheck = movies.find(x => x.imdbID === req.body.imdbID);
    if (idCheck)
        //if there is one, just abort the operation
        res.status(500).send("Movie ID should be unique");

    // We create a new date time with helper
    movie
        // Using the model to create a movie
        .createMovie(req.body)
        .then(data =>
            // OK Movie is created
            res.status(201).json({
                message: `The Movie #${data.title} has been created`,
                content: data
            })
        )
        // Error Movie not created
        .catch(err => res.status(500).json({ message: err.message }));
});

// Routes
module.exports = router;
