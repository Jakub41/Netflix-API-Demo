const { inArray } = require("./inArray");
const { newDate, newDateTime } = require("./dateTime");
const { writeToJSON, readFromJSON, writeStream, readFile } = require("./fs.helper");
const { getNewId } = require("./uuid");

module.exports = {
    inArray: inArray,
    dateTime: newDateTime,
    date: newDate,
    writeJson: writeToJSON,
    readJson: readFromJSON,
    writeStream,
    readFile,
    id: getNewId
};
