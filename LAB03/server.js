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

// Middleware to calculate parse the url and get the result
function calculate(req, res, next) {
  const queryString = url.parse(req.url, true).query;

  // Declare variables
  let x = queryString.x;
  let y = queryString.y;
  let method = queryString.method;
  let operator = "";
  let output = "";
  let equals = "&equals;";
  let failed = false;
  let answer = 0;

  // Control statement to determine the method to use
  switch (method) {
    case "add":
      answer = Number(x) + Number(y);
      operator = "&plus;";
      break;
    case "subtract":
      answer = Number(x) - Number(y);
      operator = "&minus;";
      break;
    case "multiply":
      answer = Number(x) * Number(y);
      operator = "&times;";
      break;
    case "divide":
      answer = Number(x) / Number(y);
      operator = "&divide;";screenTop
    default:
      answer = "Invalid method found!";
      failed = true;
      break;
  }

  // Check if the the calculation failed and set the output the appropriate message
  if (failed) {
    output = answer;
  } else {
    output = `${x} ${operator} ${y} ${equals} ${answer}`;
  }
}

app.use("/", calculate);
