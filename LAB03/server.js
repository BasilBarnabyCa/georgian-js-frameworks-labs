/** Name: Basil Barnaby
 * Student Number: 200540109
 * Course: COMP2068 - JavaScript Frameworks
 * Lab: 3
 * Date: June 19, 2024
 * Description: This is a simple calculator that parses the operators and operands from the URL.
 */

// Import connect
const connect = require("connect");

// Use node's built in library to create an http server
const http = require("http");

// Import the url library
const url = require("url");

// Initialize the connect app
const app = connect();
app.listen(3000);
console.log("Server running at http://localhost:3000");
