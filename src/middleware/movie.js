// Adding body module of express validator
const { check } = require("express-validator");

// Create new movie validation
const createMovieValidation = () => {
    return [
        check("imdbID")
            .notEmpty()
            .exists()
            .withMessage("You should specify the imdbID"),
        check("Title")
            .notEmpty()
            .exists()
            .withMessage("The Title is required"),
        check("Year")
            .notEmpty()
            .exists()
            .withMessage("Year is required"),
        check("Type")
            .notEmpty()
            .exists()
            .withMessage("Type is required"),
        check("Poster")
            .notEmpty()
            .exists()
            .withMessage("Poster is required"),
    ];
};

// Update movie validation
const updateMovieValidation = () => {
    return [
        check("Title")
            .notEmpty()
            .optional()
            .withMessage("The Title is required"),
        check("Year")
            .notEmpty()
            .optional()
            .withMessage("Year is required"),
        check("Type")
            .notEmpty()
            .optional()
            .withMessage("Type is required"),
        check("Poster")
            .notEmpty()
            .optional()
            .withMessage("Poster is required"),
    ];
};

module.exports = {
    createMovieValidation,
    updateMovieValidation

}
