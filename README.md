<!-- @format -->

# 01-01-2024

    - Implemented the swagger auto gen
    - Implemented all the schemas for end points

# Impemented Methods

    - Signup
    - Email Verification
    - Signin
    - Bookings
    - Bookings Update
    - Pilot registration
    - Admin approval for pilot registration

# Description

    This project involves running a Node.js server using the index.js file. The server is responsible for starting the application defined in app.js. Additionally, it creates a Swagger documentation file (swagger-output.json) and makes it available at the endpoint http://localhost:3000/api-docs/.

# Prerequisites

    Before running the project, make sure you have the following installed:

    Node.js - Make sure to install the latest LTS version.
    npm - Node package manager, comes with Node.js.

# Installation

    Clone the repository:
    git clone https://github.com/your-username/your-repo.git

# .env

    Create .env file with the below properties with values

    PORT=
    MONGODB_URI=
    JWT_SECRET=
    EMAIL_APPPASS=

# Navigate to the project directory:

    cd your-repo

# Install dependencies:

    npm install

# Usage

To start the server and generate Swagger documentation, run the following command:
node index.js
The server will start, and you can access the Swagger documentation at http://localhost:3000/api-docs/.

# Configuration

    Port: By default, the server runs on port 3000. You can modify the port in the index.js file if needed.
    Swagger Documentation
    The Swagger documentation is generated and available at http://localhost:3000/api-docs/. This documentation provides details about the API endpoints and can be used for testing and exploring the API.

# Folder Structure

    src: Contains the source code of the application.

        config: Configuration files for different environments.

        development.json: Configuration file for development environment.
        controllers: Handles the business logic of the application.

        Logger: Manages logging functionality for the application.

        middlewares: Custom middleware functions used in the application.

        models: Defines data models or interacts with the database.

        routes: Defines the routes and their corresponding handlers.

        template: Stores template files if applicable.

    tests: Contains various types of tests.

        unit: Unit tests for individual components.

        integration: Integration tests for testing the interaction between components.

        loadtests: Load tests for assessing system performance under high load.

    config: The development configuration is stored in src/config/development.json. Adjust the configuration settings as needed for the development environment.

# Testing

    The tests folder contains various types of tests. Run the tests using the following commands:

    node test

    If above commands needs to trigger , integration, unit tests, change accordingly the same in scripts test in package.json
