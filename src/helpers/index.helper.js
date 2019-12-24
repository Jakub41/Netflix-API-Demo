const { inArray } = require("./inArray");
const { newDate } = require("./dateTime");
const { writeToJSON, readFromJSON, writeStream } = require("./fs.helper");
const { getNewId } = require("./uuid");

module.exports = {
    inArray: inArray,
    dateTime: newDate,
    writeJson: writeToJSON,
    readJson: readFromJSON,
    writeStream,
    id: getNewId
};
