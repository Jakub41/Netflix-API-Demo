//Path
const path = require("path");
// Data Utilities
const p = require("../utilities/paths");

const filePath = path.join(__dirname, "../db", p.reviewJSON);
console.log(filePath);

let reviews = require(filePath);

const h = require("../helpers/index.helper");

// GET all reviews
const getReviews = () => {
    return new Promise((resolve, reject) => {
        if (reviews.length === 0) {
            reject({
                message: "No reviews at this time",
                status: 202
            });
        }
        resolve(reviews).catch(err => reject(err));
    });
};

// GET one review
const getReview = _id => {
    return new Promise((resolve, reject) => {
        // We use the helper to check the data is present in the array
        h.inArray(reviews, _id)
            .then(review => resolve(review))
            .catch(err => reject(err));
    });
};

// GET Reviews of on movie
const getReviewsOfAmovie = imdbid => {
    return new Promise((resolve, reject) => {
        // Check if it is part of an array
        h.inArray(reviews, imdbid)
            .then(() => {
                reviews = reviews.filter(m => m.imdbid !== imdbid);
                resolve(reviews);
            })
            .catch(err => reject(err));
    });
};

// POST new a review
const createReview = newReview => {
    return new Promise((resolve, reject) => {
        const date = {
            created_at: h.dateTime(),
            updated_at: h.dateTime()
        };
        // We build our query
        newReview = { _id: h.id(), ...date, ...newReview };
        // We add t the array
        reviews.push(newReview);
        // Helper write to JSON the data to file
        h.writeJson(filePath, reviews);
        // Resolve if ok Reject with error if wrong
        resolve(newReview).catch(err => reject(err));
    });
};

// PUT update review
const updateReview = (_id, newReview) => {
    return new Promise((resolve, reject) => {
        h.inArray(reviews, _id, "_id")
            .then(review => {
                const index = reviews.findIndex(b => b._id === _id);
                let updateId = { _id: _id };
                const date = {
                    created_at: review.created_at,
                    // Update only the updated at date time
                    updated_at: h.dateTime()
                };
                // Merging new data with old data
                let updatedReview = { ...reviews[index], ...newReview };
                reviews[index] = { ...updateId, ...updatedReview, ...date };
                h.writeJson(filePath, reviews);
                resolve(reviews[index]);
            })
            .catch(err => reject(err));
    });
};

// Delete review
const deleteReview = _id => {
    return new Promise((resolve, reject) => {
        // Check if it is part of an array
        h.inArray(reviews, _id, "_id")
            .then(() => {
                reviews = reviews.filter(m => m._id !== _id);
                h.writeJson(filePath, reviews);
                resolve();
            })
            .catch(err => reject(err));
    });
};

module.exports = {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    getReviewsOfAmovie
};
