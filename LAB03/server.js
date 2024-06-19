/** Name: Basil Barnaby
 * Student Number: 200540109
 * Course: COMP2068 - JavaScript Frameworks
 * Lab: 3
 * Date: June 19, 2024
 * Description: This is a simple calculator that parses the operator and operands from the URL.
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
  let answer = 0;
  let failed = false;

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
      operator = "&divide;";
	  break;
    default:
      answer = "Invalid <span class='error'>method</span> found!";
      failed = true;
      break;
  }

  // Check if the the calculation failed and set the output the appropriate message
  if (failed) {
    output = answer;
  } else {
	answer = Math.round(answer * 1000000) / 1000000;
    output = `${x} <span class="operator">${operator}</span> ${y} <span class="answer">${equals} ${answer}</span>`;
  }

  // Set the response header and write the output to the screen
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`
    <html>
      <head>
	  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
			font-family: 'Roboto Mono', monospace;
          }
          h1 {
			font-size: 5rem;
          }
		 .answer {
		    color: #10b981;
		  }
		  .operator {
			color: #8b5cf6;
		  },
		  .error {
			color: #ef4444;
		  },
        </style>
      </head>
      <body>
        <h1>${output}</h1>
      </body>
    </html>
  `);
  res.end();
}

app.use("/", calculate);
