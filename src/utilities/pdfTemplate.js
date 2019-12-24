const template = movies => {
    const pdfBody = {
        body: [],
        width: [100, 400]
    };
    if (movies.length > 1) {
        movies.map(el => pdfBody.body.push([`${el.Year}`, `${el.Title}`]));
    }

    return {
        content: [
            { text: "List of movies", style: "header" },
            { table: pdfBody }
        ]
    };
};

module.exports = template;
