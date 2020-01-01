// Sort check
const { check } = require("express-validator");

const isBoolSort = () => {
    return [
        check("asc").isBoolean().withMessage("ASC need to be a boolean"),
        check("desc").isBoolean().withMessage("DESC need to be a boolean"),
        check("year").isBoolean().withMessage("YEAR need to be a boolean")
    ];
};

exports.module = { isBoolSort };
