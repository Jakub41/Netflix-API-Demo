// Express
const express = require("express");
// Router
const router = express.Router();

//  Email sender
const { sendEmail } = require("../utilities/sg_email");

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
