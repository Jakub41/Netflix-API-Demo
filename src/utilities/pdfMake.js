const { uploads, pdfDir, moviesDB } = require("../config/config");
const pdfMaker = require("pdfmake");
const template = require("./pdfTemplate");
const { writeStream } = require("../helpers/fs.helper");
const path = require("path");

const generatePdf = (movies, name) => {
    return new Promise((resolve, reject) => {
        try {
            let fonts = {
                Roboto: {
                    normal: "Helvetica",
                    bold: "Helvetica-Bold",
                    italics: "Helvetica-Oblique",
                    bolditalics: "Helvetica-BoldOblique"
                }
            };
            let printer = new pdfMaker(fonts);
            const pdfTemplate = template(movies);
            const pdfStream = printer.createPdfKitDocument(pdfTemplate, {});
            const filePath = path.join(
                __dirname,
                uploads + "/" + pdfDir + `${name}.pdf`
            );
            console.log(filePath);
            pdfStream.pipe(writeStream(filePath));
            pdfStream.end();
            resolve(filePath);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports = generatePdf;
