// Env variables from config.js
const { port } = require("./src/config/config");

// Express lib
const express = require("express");

// Body parser lib
const bodyParser = require("body-parser");

// CORS lib
const cors = require("cors");

// Morgan lib logger middleware https://www.npmjs.com/package/morgan
// To log app activities a good way to keep track of what is going on
// Useful also to the debug issues when an exception come ups
const morgan = require("morgan");

// Defining the server/app
const server = express();

// List routes
const listEndpoints = require("express-list-endpoints");

// Using CORS
server.use(cors());

// We use Morgan to log our server
// "tiny" The minimal output of the log the default light param
server.use(morgan("dev"));

// Body parse JSON
// Returns middleware that only parses json
server.use(bodyParser.json());

// Query middleware
server.use((req, res, next) => {
    for (let key in req.query) {
        req.query[key] = req.query[key];
    }
    next();
});

// Express urlencoded
// Returns middleware that only parses urlencoded with the QueryString module
/**
 * You NEED express.json() and express.urlencoded()
 * for POST and PUT requests,
 * because in both these requests you are sending data (in the form of some data object)
 * to the server and you are asking the server to accept or store that data (object),
 * which is enclosed in the body (i.e. req.body) of that (POST or PUT) Request
 *
 */
server.use(
    bodyParser.urlencoded({
        extended: true
    })
);

server.use(express.json());

// Main Routing
server.use(require("./src/routes/index.routes"));

// Endpoints list
console.log(listEndpoints(server));

// Missing routes check
server.use((req, res) => {
    res.send("route not found 404");
});

// Starting the server on env port
server.listen(`${port}` || "3000", () => {
    // Showing a message to the console informing on which port is running
    console.log(`Server is running on port ${port}`);
});
