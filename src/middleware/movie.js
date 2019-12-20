// Adding body module of express validator
const { check, sanitizeBody } = require("express-validator");

// Create new movie validation
const createMovieValidation = () => {
    return [
        check("imdbID")
            .notEmpty()
            .exists()
            .withMessage("You should specify the imdbID"),
        check("title")
            .notEmpty()
            .exists()
            .withMessage("The Title is required"),
        check("year")
            .notEmpty()
            .exists()
            .withMessage("Year is required"),
        check("type")
            .notEmpty()
            .exists()
            .withMessage("Type is required"),
        check("poster")
            .notEmpty()
            .exists()
            .withMessage("Poster is required"),
    ];
};

// Update movie validation
const updateMovieValidation = () => {
    return [
        check("title")
            .notEmpty()
            .optional()
            .withMessage("The Title is required"),
        check("year")
            .notEmpty()
            .optional()
            .withMessage("Year is required"),
        check("type")
            .notEmpty()
            .optional()
            .withMessage("Type is required"),
        check("poster")
            .notEmpty()
            .optional()
            .withMessage("Poster is required"),
    ];
};

module.exports = {
    createMovieValidation,
    updateMovieValidation

}
