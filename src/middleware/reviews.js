// Adding body module of express validator
const { check, sanitizeBody } = require("express-validator");

// Create new movie validation
const createReviewValidation = () => {
    return [
        check("rate")
            .exists()
            .withMessage("rate is required")
            .isNumeric()
            .withMessage("The rate should be between 0 and 5"),
        check("imdbID")
            .notEmpty()
            .exists()
            .withMessage("imdbID is required")
    ];
};

// Update movie validation
const updateReviewValidation = () => {
    return [
        check("rate")
            .exists()
            .withMessage("rate is required")
            .isNumeric()
            .withMessage("The rate should be between 0 and 5"),
        check("imdbID")
            .notEmpty()
            .exists()
            .withMessage("imdbID is required")
    ];
};

module.exports = {
    createReviewValidation,
    updateReviewValidation
};
