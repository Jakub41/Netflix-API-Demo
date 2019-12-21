// Express
const express = require("express");
// Router
const router = express.Router();
// Omdb API
const { searchMovieOmdb } = require("../services/omdbAPI/omdb");

// Search movie on OMDB API
router.get("/omdb/:s", async (req, res) => {
    const s = req.params.s;
    // Await response server
    await searchMovieOmdb(s)
        .then(s => res.json(s))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

module.exports = router;
