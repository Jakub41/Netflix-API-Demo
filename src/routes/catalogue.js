// Express
const express = require("express");
// Router
const router = express.Router();
//  Email sender
const { sendEmail } = require("../utilities/sg_email");
// Model
const { movie } = require("../models/index.models");
// Validation
const { isValidEmail } = require("../middleware/index.middleware");
// PDF Generator
const generatePdf = require("../utilities/pdfMake");
// Search movie
const searchMovie = require("../utilities/searchMovie");

// GET the entire movies catalogue to PDF
router.get("/pdf/all", async (req, res) => {
    const movies = await movie.getMovies();
    try {
        const pdf = await generatePdf(movies, "movies_catalogue");
        res.download(pdf);
    } catch (err) {
        // Errors
        res.status(err.status).json({ message: err.message });
        throw new Error(error.message);
    }
});

// GET search a movie by title to a PDF table
router.get("/pdf", async (req, res) => {
    let title = req.query.title;

    console.log(title);

    const queryParam = [];
    if (title !== undefined) {
        queryParam.push({ Title: title });
        console.log(queryParam);
    }

    await movie
        .getMovies()
        .then(movie => {
            // Results of the query
            result = searchMovie(queryParam, movie);
            console.log(result);
            console.log(title);
            const pdf = generatePdf(result, title);
            res.download(pdf);
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong!"
            });
            throw new Error(err.message);
        });
});

// Search query
router.get("/search", async (req, res) => {
    // 3 query params
    let title = req.query.title;
    let year = req.query.year;
    let type = req.query.type;
    // Checking query params and push
    const queryParam = [];
    if (type !== undefined) {
        queryParam.push({ Type: type });
    }
    if (title !== undefined) {
        queryParam.push({ Title: title });
    }
    if (year !== undefined) {
        queryParam.push({ Year: year });
    }
    // Getting movies array
    await movie
        .getMovies()
        .then(movie => {
            // Results of the query
            result = searchMovie(queryParam, movie);
            res.json({ data: result });
        })
        .catch(err => {
            res.json({
                error: err
            });
        });
});

// POST email send
router.post("/email", async (req, res) => {
    const receiver = req.query.receiver.toLowerCase();
    const movies = await movie.getMovies();
    // Email Validation
    const valid = isValidEmail(receiver);
    // Valid try to send
    if (valid) {
        try {
            const pdf = await generatePdf(movies, "movies_catalogue");
            // Waiting the email is sent
            const sent = await sendEmail(receiver, pdf);
            // No errors
            if (sent) {
                res.send({
                    message: `Email sent to ${receiver} successfully`,
                    status: 200
                });
                console.log("Email sent");
            }
        } catch (error) {
            // Errors
            res.status(500).json({ message: err.message });
            throw new Error(error.message);
        }
    } else {
        // Not valid error response
        res.send({
            message: `Email ${receiver} not in a valid format`,
            status: 500
        });
    }
});

// Routes
module.exports = router;
