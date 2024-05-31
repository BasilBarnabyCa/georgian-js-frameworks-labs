/** Name: Basil Barnaby
 * Student Number: 200540109
 * Course: COMP2068 - JavaScript Frameworks
 * Lab: 2
 * Date: May 30, 2024
 * Description: This is a simple Rock, Paper, Scissors game built with node that allows the user to play against the computer.
 */

// Import prompt module
const prompt = require("prompt");

// Start the prompt
prompt.start();

// Define the schema for the user's selection to be passed to the prompt.get() method
const schema = {
  properties: {
    userSelection: {
      rules: "Choose ROCK, PAPER or SCISSORS",
      pattern: /^(ROCK|PAPER|SCISSORS)$/i, // Regular expression to match ROCK, PAPER or SCISSORS, i matches case-insensitive
      message: "You must choose ROCK, PAPER or SCISSORS. Please try again!",
      require: true,
    },
  },
};

// Display instructions to the user
console.log(`\n${schema.properties.userSelection.rules}\n`);

// Get the user's selection and determine the outcome of the game
prompt.get(schema, (err, result) => {
  // If there is an error, log it and return
  if (err) {
    console.error(err);
    return;
  }

  // Get User's selection and convert it to uppercase
  const userSelection = result.userSelection.toUpperCase();
  console.log(`\nYou chose: ${userSelection}`);

  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Ternary operator to determine the computer's choice and display it
  const computerSelection =
    randomNumber < 0.34 ? "ROCK" : randomNumber < 0.67 ? "PAPER" : "SCISSORS";
  console.log(`Computer chose: ${computerSelection}\n`);

  // Determine the winner
  let gameResult;
  if (userSelection === computerSelection) {
    gameResult = "It's a tie";
  } else if (
    // Combined all the winning conditions for the user
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
  ) {
    gameResult = "User Wins";
  } else {
    gameResult = "Computer Wins";
  }

  // Log the game result
  console.log(gameResult); 
});
