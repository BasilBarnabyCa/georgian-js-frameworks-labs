# FlightDeck Web Application

## Overview

FlightDeck is a web application designed to manage and monitor flight operations. It provides various user roles, including Admin, Agent, and Subscriber, each with distinct access levels and functionalities. This application is built using Node.js, Express, MongoDB, and Handlebars, with user authentication handled by Passport.js.

## Live Demo

Check out the live demo of the FlightDeck application [here](flightdeck-web-app.azurewebsites.net).

## Features
- **User Roles:** 
  - **Admin:** Full access to manage airlines, airports, flights, and users.
  - **Agent:** Limited access to manage flights and view specific data related to airlines.
  - **Subscriber:** Access to personalized flight information and updates.

- **Authentication:** 
  - Users can sign up and log in using secure authentication.
  - Role-based access control to ensure data security.

- **Flight Management:**
  - Manage airlines, airports, and flights with CRUD operations.
  - Real-time updates and status tracking.

- **Seeders:**
  - Predefined data for airlines and airports can be seeded into the database for initial setup.

## Additional Features: Nodemailer and OpenAI Integration

### Nodemailer Integration

**Description:**
The application integrates Nodemailer to handle email notifications, providing users with important updates, confirmations, and alerts directly to their inbox.

**Key Features:**
- **User Registration Confirmation**: Sends a welcome email to users upon successful registration.

**Usage:**
1. **Set Up SMTP Configuration**: Configure the SMTP settings in your environment variables for email delivery.
2. **Trigger Emails**: Emails are automatically triggered upon specific actions like user registration or flight updates.

### OpenAI Integration

**Key Features:**
- **Flight Information Queries**: Users can ask natural language questions about flights, and the application will respond with accurate information.
- **Personalized Travel Suggestions**: Provides users with recommendations based on their travel history and preferences.

**Usage:**
1. **Set Up API Key**: Obtain an API key from OpenAI and configure it in your environment variables.
2. **Implement Queries**: Use the OpenAI API to handle specific queries and interactions within the application.
3. **Customize Responses**: Tailor the AI responses to match the tone and requirements of your application.

**Description:**
The application leverages the OpenAI API to provide advanced features such as natural language processing and personalized recommendations. This enhances the user experience by providing more intuitive and intelligent interactions.

## Installation
1. **Clone the Repository**		
   ```bash
   git clone https://github.com/yourusername/flightdeck-webapp.git
   cd flightdeck-webapp		

2. **Clone the Repository**		
   ```bash
   npm install		

3. **Set Up Environment Variables**		
   ```bash
   npm install		

4. **Run Database Seeders**		
	Log in as the admin with the following credentials:

	Email: `admin@email.com`
	Password: `admin`
	Navigate to the "Seeders" section in the menu.

	Seed all the data (airlines, airports, etc.) from the Seeders page.

5. **Start Application**		
   ```bash
   nodemon

## Usage

### Authentication

- **Sign Up:** Users can sign up with their name, email, and password.
- **Log In:** Existing users can log in to access the application and see flight schedules.

### Middleware Rules

#### Admin and Agent Routes:

- When not logged in, accessing `/admin` or `/agent` returns a 404 error.
- When logged in as a subscriber, accessing `/admin` or `/agent` returns a 404 error.
- When logged in as an admin or agent and trying to access `/subscriber`, the user will be logged out and redirected to the login page.

#### Subscriber Routes:

- When not logged in and accessing `/subscriber`, the user is redirected to the login page.

### Managing Flights, Airlines, and Airports

- **Admins** can create, read, update, and delete flights, airlines, and airports.
- **Agents** have limited access to manage flights associated with their airlines.
- **Subscribers** can view their personalized flight information and updates.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Handlebars.js](https://handlebarsjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)