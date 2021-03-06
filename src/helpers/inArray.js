// Helper to check if a row exist by ID and return a promise
// Read one, Update and Delete
const inArray = (array, imdbid, keyName) => {
    // Promise accepts 2 arguments callbacks provided by JS
    // Resolve if the promise success with a result
    // Rejects if the error occur
    return new Promise((resolve, reject) => {
        // Row we check if exist the id in the array
        if (keyName) var row = array.find(r => r[keyName] === imdbid);
        else var row = array.find(r => r.imdbID === imdbid);
        if (!row) {
            // If not row then we reject and show an message and status 404
            reject({
                message: "Not found",
                status: "404"
            });
        }
        // Else we resolve the Promise result
        resolve(row);
    });
};

module.exports = {
    inArray
};
