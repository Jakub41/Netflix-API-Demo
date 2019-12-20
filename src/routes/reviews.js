// Express
const express = require("express");
// Router
const router = express.Router();
// Review model
const { review } = require("../models/index.models");
// Validations middleware
const check = require("../middleware/index.middleware");

// GET all Reviews
router.get("/", check.rules, async (req, res) => {
    // Await response server
    await review
        .getReviews()
        .then(reviews => res.json(reviews))
        // If any errors
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

router.get("/:id", check.rules, async (req, res) => {
    const id = req.params.id;
    await review
        .getReview(id)
        .then(review => res.json(review))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: err.message });
            }
        });
});

router.post("/", check.createReview(), check.rules, async (req, res) => {
    review
        .createReview(req.body)
        .then(data =>
            // OK Review is created
            res.status(201).json({
                message: `The Review has been created`,
                content: data
            })
        )
        // Error Review not created
        .catch(err => res.status(500).json({ message: err.message }));
});

// PUT Update a Review
router.put("/:id", check.updateReview(), check.rules, async (req, res) => {
    // Request ID
    const id = req.params.id;
    // Await the Review
    await review
        // Call model to update the product
        .updateReview(id, req.body)
        // Response a message
        .then(review =>
            res.json({
                message: `The Review has been updated`,
                content: review
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

// DELeTE a Review
router.delete("/:id", check.rules, async (req, res) => {
    const id = req.params.id;
    // Await server
    await review
        // Model delete product
        .deleteReview(id)
        .then(review =>
            // Response
            res.json({
                message: `The Review has been deleted`
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

// Routes
module.exports = router;
