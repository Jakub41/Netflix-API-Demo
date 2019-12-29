const path = require("path");
const multer = require("multer");
const mime = require("mime-types");
const { date } = require("../helpers/index.helper");
const { POSTERS } = require("../config/config");
const { uploadsDir } = require("../utilities/paths");

// setting up storage engine for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + date() + "." + mime.extension(file.mimetype)
        );
    }
});

// upload middleware
const upload = multer({
    storage: storage,

    fileFilter: (req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    }
});

module.exports = { upload };
