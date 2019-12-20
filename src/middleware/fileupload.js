const path = require("path");
const multer = require("multer");
const mime = require("mime-types");

const { uploads, POSTERS } = require("../config/config");

// setting up storage engine for file upload
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, uploads + "/" + POSTERS));
    },
    filename: function(req, file, cb) {
        cb(
            null,
            file.fieldname +
                "-" +
                Date.now() +
                "." +
                mime.extension(file.mimetype)
        );
    }
});

// upload middleware
const upload = multer({
    storage: storage,

    fileFilter: function(req, file, callback) {
        var ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    }
});

module.exports = { upload };
