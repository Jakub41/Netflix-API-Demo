const searchMovie = (queryParam, movie) => {
    const result = [];
    for (let i = 0; i < movie.length; i++) {
        if (queryParam.length == 3) {
            if (
                movie[i][Object.keys(queryParam[0])[0]] ===
                    Object.values(queryParam[0])[0] &&
                movie[i][Object.keys(queryParam[1])[0]] ===
                    Object.values(queryParam[1])[0] &&
                movie[i][Object.keys(queryParam[2])[0]] ===
                    Object.values(queryParam[2])[0]
            ) {
                result.push(movie[i]);
            }
        }
        if (queryParam.length === 2) {
            if (
                movie[i][Object.keys(queryParam[0])[0]] ===
                    Object.values(queryParam[0])[0] &&
                movie[i][Object.keys(queryParam[1])[0]] ===
                    Object.values(queryParam[1])[0]
            ) {
                result.push(movie[i]);
            }
        }
        if (queryParam.length == 1) {
            if (
                movie[i][Object.keys(queryParam[0])[0]] ===
                Object.values(queryParam[0])[0]
            ) {
                result.push(movie[i]);
            }
        }
    }
    return result;
};

module.exports = searchMovie;
