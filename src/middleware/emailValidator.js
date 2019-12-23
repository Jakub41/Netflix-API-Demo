const { emailRegEx } = require("../utilities/regex");

// Validate if an email address is in valid format
const isValidEmail = emailAddress => {
    // Email present
    if (!emailAddress) return false;
    // Correct length
    if (emailAddress.length > 256) return false;
    // Testing against the regex
    let valid = emailRegEx.test(emailAddress);
    if (!valid) return false;
    // Has the @ part right
    let parts = emailAddress.split("@");
    if (parts[0].length > 64) return false;
    // domain part check
    let domainParts = parts[1].split(".");
    if (
        domainParts.some(function(part) {
            return part.length > 64;
        })
    )   // Not valid
        return false;
    // Valid
    return true;
};

module.exports = { isValidEmail };
