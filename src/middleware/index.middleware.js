const { validateRules } = require("./validator");
const { createMovieValidation, updateMovieValidation } = require("./movie");
const { createReviewValidation, updateReviewValidation } = require("./reviews");
const { upload } = require("./fileupload");
const { isValidEmail } = require("../middleware/emailValidator");
const { isBoolSort } = require("./sortCheckBool");

module.exports = {
    rules: validateRules,
    createMovie: createMovieValidation,
    updateMovie: updateMovieValidation,
    createReview: createReviewValidation,
    updateReview: updateReviewValidation,
    upload,
    isValidEmail,
    isBoolSort
};
