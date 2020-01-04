// Sort check by query
const { query } = require("express-validator");

const isBoolSort = () => {
    return [
        query("asc")
            .optional()
            .isBoolean()
            .withMessage("ASC need to be a boolean"),
        query("desc")
            .optional()
            .isBoolean()
            .withMessage("DESC need to be a boolean"),
        query("year")
            .optional()
            .isBoolean()
            .withMessage("YEAR need to be a boolean")
    ];
};

module.exports = { isBoolSort };
