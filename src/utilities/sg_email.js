const { sg_token } = require("../config/config");
const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");

const mailGenerator = new MailGen({
    theme: "salted",
    product: {
        name: "Awesome Movies",
        link: "http://example.com"
    }
});

const email = {
    body: {
        intro: [
            "Welcome to the movie platform",
            "Discover today the best movies you can watch"
        ],
        action: {
            instructions:
                "Please click the button below to checkout new movies",
            button: {
                color: "#33b5e5",
                text: "New Movies Waiting For you",
                link: "http://example.com/"
            }
        }
    }
};

const emailTemplate = mailGenerator.generate(email);
require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

const msg = {
    from: "jake@email.io",
    subject: "Testing email from NodeJS",
    html: emailTemplate
};

const sendEmail = receiver => {
    try {
        sgMail.setApiKey(sg_token);
        return sgMail.send({ ...msg, to: receiver, ...email, body: { name: receiver }});
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { sendEmail };
