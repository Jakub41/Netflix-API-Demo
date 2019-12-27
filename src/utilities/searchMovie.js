const searchMovie = (queryParam, movie) => {
    // result array
    const result = [];
    // Filtering
    for (let i = 0; i < movie.length; i++) {
        // Query by title + year + type
        if (queryParam.length == 3) {
            if (
                movie[i][Object.keys(queryParam[0])[0]].includes(
                    Object.values(queryParam[0])[0]) &&
                movie[i][Object.keys(queryParam[1])[0]].includes(
                    Object.values(queryParam[1])[0]) &&
                movie[i][Object.keys(queryParam[2])[0]].includes(
                    Object.values(queryParam[2])[0])
            ) {
                result.push(movie[i]);
            }
        }
        // query with 2 params any combination of pairs
        if (queryParam.length === 2) {
            if (
                movie[i][Object.keys(queryParam[0])[0]].includes(
                    Object.values(queryParam[0])[0]) &&
                movie[i][Object.keys(queryParam[1])[0]].includes(
                    Object.values(queryParam[1])[0])
            ) {
                result.push(movie[i]);
            }
        }
        // query with 1 params
        if (queryParam.length == 1) {
            if (
                movie[i][Object.keys(queryParam[0])[0]].includes(
                Object.values(queryParam[0])[0])
            ) {
                result.push(movie[i]);
            }
        }
    }
    return result;
};

module.exports = searchMovie;
