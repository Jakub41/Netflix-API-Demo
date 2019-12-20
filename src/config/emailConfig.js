const c = require("./config");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    port: c.email_port,
    ssl: false,
    tls: true,
    auth: {
        user: c.email_user,
        pass: c.email_pass
    }
});

module.exports = { transport };
