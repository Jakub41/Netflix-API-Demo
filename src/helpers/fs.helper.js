// File System Lib
const fs = require("fs-extra");

// Helper to write a JSON file
const writeToJSON = (filename, content) => {
    return fs.writeFile(filename, JSON.stringify(content), "utf8", err => {
        if (err) console.log("Writing the file caused an error => ", err);
    });
};

// Helper to read a JSON file
const readFromJSON = filename => {
    return fs.readFile(filename, err => {
        if (err) console.log("reading the file caused an error => ", err);
    });
};

// Helper to write stream
const writeStream = filename => {
    return fs.createWriteStream(filename, err => {
        if (err) console.log("Write stream error => ", err);
    });
};

// Helper to read stream
const readFile = (filename, binary) => {
    return fs.readFileSync(filename, binary, err => {
        if (err) console.log("Read file error => ", err);
    });
};

module.exports = {
    writeToJSON,
    readFromJSON,
    writeStream,
    readFile
};
