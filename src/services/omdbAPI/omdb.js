const { omdbApi, omdbKey } = require("../../config/config");
const fetch = require("node-fetch");

const url = omdbApi + "/?apikey=" + omdbKey;

const searchMovieOmdb = async s => {
    return new Promise((resolve, reject) => {
        fetch(url + "&s=" + s)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                resolve(json);
            })
            .catch(err => reject(err));
    });
};

const getMovieOmdb = async id => {
    return new Promise((resolve, reject) => {
        fetch(url + "&i=" + id)
            .then(response => {
                return response.json();
            })
            .then(json => {
                console.log(json);
                resolve(json);
            })
            .catch(err => reject(err));
    });
};

module.exports = { searchMovieOmdb, getMovieOmdb };
