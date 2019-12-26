const { sg_token } = require("../config/config");
const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const { readFile, date } = require("../helpers/index.helper");

const mailGenerator = new MailGen({
    theme: "salted",
    product: {
        name: "Awesome Movies",
        link: "http://example.com"
    }
});

const sendEmail = async (receiver, pdf) => {
    const email = {
        body: {
            name: receiver.split("@")[0], // will take the part before the @ symbol
            intro: [
                "Welcome to the movie platform",
                "Discover today the best movies you can watch",
                "Attached to this mail the full list of movies we have in the catalogue"
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
    // A test of the email preview in HTML
    //require("fs").writeFileSync("preview.html", emailTemplate, "utf8");

    const pdfAttachment = readFile(pdf, 'base64');
    const msg = {
        from: "jake@email.io",
        subject: "Awesome movies catalogue",
        html: emailTemplate,
        attachments: [
            {
                content: pdfAttachment,
                filename: `movie_catalogue_${date()}.pdf`,
                type: "application/pdf",
                disposition: "attachment"
            }
        ]
    };

    try {
        sgMail.setApiKey(sg_token);
        return sgMail.send({
            ...msg,
            to: receiver,
            ...email,
            body: { name: receiver }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { sendEmail };
