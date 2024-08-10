# FlightDeck Web Application

## Table of Contents
- [Overview](#overview)
- [Live Demo](#live-demo)
- [Features](#features)
  - [User Roles](#user-roles)
  - [Authentication](#authentication)
  - [Middleware Rules](#middleware-rules)
    - [Admin and Agent Routes](#admin-and-agent-routes)
    - [Subscriber Routes](#subscriber-routes)
  - [Managing Flights, Airlines, and Airports](#managing-flights-airlines-and-airports)
- [Additional Features: Nodemailer and OpenAI Integration](#additional-features-nodemailer-and-openai-integration)
  - [Nodemailer Integration](#nodemailer-integration)
    - [Set Up SMTP Configuration](#set-up-smtp-configuration)
    - [Trigger Emails](#trigger-emails)
    - [How to Generate a Google App Password](#how-to-generate-a-google-app-password)
- [Installation](#installation)
- [Acknowledgments](#acknowledgments)

## Overview

FlightDeck is a web application designed to manage and monitor flight operations. It provides various user roles, including Admin, Agent, and Subscriber, each with distinct access levels and functionalities. This application is built using Node.js, Express, MongoDB, and Handlebars, with user authentication handled by Passport.js.

## Live Demo

Check out the live demo of the FlightDeck application [here](https://flightdeck-web-app.azurewebsites.net).

## Features
- **User Roles:** 
  - **Admin:** Full access to manage airlines, airports, flights, and users.
  - **Agent:** Limited access to manage flights and view specific data related to airlines (coming soon).
  - **Subscriber:** Access to personalized flight information and updates.

- **Authentication:** 
  - Users can sign up and log in using secure authentication.
  - Role-based access control to ensure data security.
  - Users can login/sign-up with GitHub

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
- **Subscribers** can view their flight information and updates.

- **Flight Management:**
  - Manage airlines, airports, and flights with CRUD operations.
  - Real-time updates and status tracking.
  - Dashboard with KPIs and metrics (coming soon).

- **Seeders:**
  - Predefined data for airlines and airports can be seeded into the database for initial setup.

## Additional Features: Nodemailer and Gmail Integration

### Nodemailer Integration

**Description:**
The application integrates Nodemailer to handle email notifications, providing users with important updates, confirmations, and alerts directly to their inbox.

**Key Features:**
- **User Registration Confirmation**: Sends a welcome email to users upon successful registration.

**Usage:**

1. **Set Up SMTP Configuration**:
   - **Environment Variables**: Configure the SMTP settings in your `.env` file for email delivery.
   - Add the following lines to your `.env` file:
     ```plaintext
     GMAIL_USER=your-email@gmail.com
     GMAIL_PASS=your-google-app-password
     ```
     - **GMAIL_USER**: Replace `your-email@gmail.com` with the Gmail address you want to use to send emails.
     - **GMAIL_PASS**: Replace `your-google-app-password` with the App Password generated in your Google account. This is required instead of your usual Gmail password for security reasons.

2. **Trigger Emails**:
   - Emails are automatically triggered upon specific actions like user registration or flight updates. For example, when a user successfully registers, they receive a confirmation email sent from the configured Gmail account.

---

### How to Generate a Google App Password:

1. **Go to Google Account Security Settings**: Navigate to [Google Account Security](https://myaccount.google.com/security) and log in if necessary.
2. **Enable 2-Step Verification**: Ensure that 2-Step Verification is enabled on your account.
3. **Generate App Password**:
   - Under the "Signing in to Google" section, click on **App passwords**.
   - Select **Mail** as the app and choose **Other** as the device, then name it something like "Nodemailer".
   - Click **Generate** to get your App Password. Copy this password and use it in the `GMAIL_PASS` field in your `.env` file.


## Installation
1. **Clone the Repository**		
   ```bash
   git clone https://github.com/BasilBarnabyCa/COMP2068JSFrameworks.git
   cd COMP2068JSFrameworks/ASSIGNMENT02

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

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Handlebars.js](https://handlebarsjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nodemailer](https://nodemailer.com/.com/)