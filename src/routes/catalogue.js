// Express
const express = require("express");
// Router
const router = express.Router();
//  Email sender
const { sendEmail } = require("../utilities/sg_email");
// Model
const { catalogue } = require("../models/index.models")

// GET Search catalogue of movies
router.post("/search?t", async (req, res) => {
    const t = req.params.t;
    await catalogue
        .searchInCatalogue()
        .
});

// POST email send
router.post("/email", async (req, res) => {
    // const email = req.params.email;
    try {
        const sent = await sendEmail();
        if (sent) {
            res.send({ message: "email sent successfully", status: 200 });
            console.log("Email sent");
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// Routes
module.exports = router;
