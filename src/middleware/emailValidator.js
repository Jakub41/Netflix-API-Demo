const { emailRegEx } = require("../utilities/regex");

// Validate if an email address is in valid format
const isValidEmail = emailAddress => {
    if (!emailAddress) return false;

    if (emailAddress.length > 256) return false;

    let valid = emailRegEx.test(emailAddress);
    if (!valid) return false;

    let parts = emailAddress.split("@");
    if (parts[0].length > 64) return false;

    let domainParts = parts[1].split(".");
    if (
        domainParts.some(function(part) {
            return part.length > 64;
        })
    )
        return false;

    return true;
};

module.exports = { isValidEmail };
