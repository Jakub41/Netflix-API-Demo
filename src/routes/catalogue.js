// Express
const express = require("express");
// Router
const router = express.Router();
//  Email sender
const { sendEmail } = require("../utilities/sg_email");
// Model
const { catalogue } = require("../models/index.models");

// GET Search catalogue of movies
// router.post("/search", async (req, res) => {
//     const t = req.params.t;
//     await catalogue
//         .searchInCatalogue()
//         .
// });

// POST email send
router.post("/email/:receiver", async (req, res) => {
    const receiver = req.params.receiver;
    try {
        const sent = await sendEmail(receiver);
        if (sent) {
            res.send({ message: `Email sent to ${receiver} successfully`, status: 200 });
            console.log("Email sent");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// Routes
module.exports = router;
