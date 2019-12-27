// Express
const express = require("express");
// Router
const router = express.Router();
//  Email sender
const { sendEmail } = require("../utilities/sg_email");
// Model
const { catalogue, movie } = require("../models/index.models");
// Validation
const { isValidEmail } = require("../middleware/index.middleware");
// PDF Generator
const generatePdf = require("../utilities/pdfMake");
// Search movie
const searchMovie = require("../utilities/searchMovie");

router.get("/pdf/all", async (req, res) => {
    const movies = await movie.getMovies();
    try {
        const pdf = await generatePdf(movies, "all");
        if (pdf) {
            res.send({
                message: "PDF created",
                status: 200
            });
            console.log("PDF generated");
        }
    } catch (err) {
        // Errors
        res.status(err.status).json({ message: err.message });
        throw new Error(error.message);
    }
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
router.post("/email/:receiver", async (req, res) => {
    const receiver = req.params.receiver.toLowerCase();
    // Email Validation
    const valid = isValidEmail(receiver);
    // Valid try to send
    if (valid) {
        try {
            // Waiting the email is sent
            const sent = await sendEmail(receiver);
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
