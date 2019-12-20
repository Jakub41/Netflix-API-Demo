const { transport } = require("../config/emailConfig");

const emailSender = () => {
    const message = {
        from: "kubus41@gmail.com", // Sender address
        to: "lemiszewski@gmx.com", // List of recipients
        subject: "Welcome to my API", // Subject line
        text: "Have fun coding!" // Plain text body
    };

    transport.sendMail(message, (err, info) => {
        if (err) {
            console.log("Errors ", err);
        } else {
            console.log("Email sent ", info);
        }
    });
};

module.exports = { emailSender };
