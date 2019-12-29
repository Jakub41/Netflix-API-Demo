// Express
const express = require("express");
// Router
const router = express.Router();
// Models
const { movie, review } = require("../models/index.models");
// Validations middleware
const check = require("../middleware/index.middleware");
// Directory uploads/posters
const { POSTERS } = require("../config/config");
const { uploadsDir } = require("../utilities/paths")

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
        .createMovie(req.matchedData)
        .then(data =>
            // OK Movie is created
            res.status(201).json({
                message: `The Movie #${data.Title} has been created`,
                content: data
            })
        )
        // Error Movie not created
        .catch(err => res.status(500).json({ message: err.message }));
});

// PUT Update a movie
router.put("/:imdbid", check.updateMovie(), check.rules, async (req, res) => {
    // Request ID
    const imdbid = req.params.imdbid;
    // Await the movie
    await movie
        // Call model to update the product
        .updateMovie(imdbid, req.matchedData)
        // Response a message
        .then(movie =>
            res.json({
                message: `The Movie #${imdbid} has been updated`,
                content: movie
            })
        )
        // Errors if any
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
});

// DELETE a movie
router.delete("/:imdbid", check.rules, async (req, res) => {
    const imdbid = req.params.imdbid;
    // Await server
    await movie
        // Model delete product
        .deleteMovie(imdbid)
        .then(movie =>
            // Response
            res.json({
                message: `The Movie #${imdbid} has been deleted`
            })
        )
        // Any error
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            }
            res.status(500).json({ message: err.message });
        });
});

// GET reviews of a movie
router.get("/:imdbid/reviews", check.rules, async (req, res) => {
    const imdbid = req.params.imdbid;
    // Await server
    await review
        .getReviewsOfAmovie(imdbid)
        .then(review => res.json(review))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

// POST Upload a poster of a movie
router.post("/:imdbid/upload", (req, res) => {
    // Check the upload
    check.upload.single("poster")(req, res, async function(err) {
        // Errors
        if (err) {
            res.status(err.status || 500).json({ message: err });
            return;
        }
        // Taking the params
        const imdbid = req.params.imdbid;
        const file = req.file;
        const url = `${uploadsDir}${POSTERS}${file.filename}`;

        // Await the movie
        await movie
            // Call model to update the movie poster
            .updateMovie(imdbid, { Poster: url })
            // Response a message
            .then(movie =>
                res.json({
                    message: `The Movie #${imdbid} has been updated`,
                    content: movie
                })
            )
            // Errors if any
            .catch(err => {
                if (err.status) {
                    res.status(err.status).json({ message: err.message });
                }
                res.status(500).json({ message: err.message });
            });
    });
});

// Routes
module.exports = router;
