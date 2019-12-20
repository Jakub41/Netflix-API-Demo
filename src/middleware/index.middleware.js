const { validateRules } = require("./validator");
const {
    createMovieValidation,
    updateMovieValidation
} = require("./movie");

module.exports = {
    rules: validateRules,
    createMovie: createMovieValidation,
    updateMovie: updateMovieValidation
};
