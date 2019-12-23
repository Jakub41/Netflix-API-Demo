// Express
const express = require("express");
// Router
const router = express.Router();
//  Email sender
const { sendEmail } = require("../utilities/sg_email");
// Model
const { catalogue } = require("../models/index.models");
// Validation
const { isValidEmail } = require("../middleware/index.middleware");

// GET Search catalogue of movies
// router.post("/search", async (req, res) => {
//     const t = req.params.t;
//     await catalogue
//         .searchInCatalogue()
//         .
// });

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
