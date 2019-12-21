// Config
const url = require("../config/config");
// Express Lib
const express = require("express");
// Routes lib
const router = express.Router();

// Defining the Index Routers
router.use(url.movies, require("./movies"));
router.use(url.reviews, require("./reviews"));
router.use(url.catalogue, require("./catalogue"));

// Exporting the Index Router
module.exports = router;
