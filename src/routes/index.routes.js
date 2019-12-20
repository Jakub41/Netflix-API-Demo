// Config
const url = require("../config/config");
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Defining the Index Router for movies
router.use(url.movies, require("./movies"));
router.use(url.reviews, require("./reviews"));

// Exporting the Index Router
module.exports = router;
