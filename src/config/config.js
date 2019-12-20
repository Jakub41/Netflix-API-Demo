require("dotenv").config();

module.exports = {
    // Server
    port: process.env.PORT,
    movies: process.env.MOVIES,
    reviews: process.env.REVIEWS,
    // Directories
    moviesDB: process.env.MOVIES_DB,
    reviewsDB: process.env.REVIEWS_DB,
    uploads: process.env.UPLOADS,
    pdfDir: process.env.PDF,
    POSTERS: process.env.POSTERS,
    // Email
    email_port: process.env.EMAIL_PORT,
    email_host: process.env.EMAIL_HOST,
    email_user: process.env.EMAIL_USER,
    email_pass: process.env.EMAIL_PASS
};
