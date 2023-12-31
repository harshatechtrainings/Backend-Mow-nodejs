/** @format */

const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "Description of your API",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update with your server URL
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js"), path.join(__dirname, "../routes/pilot/*.js")], // Update with the path to your API routes
};

const specs = swaggerJsdoc(options);

console.log(JSON.stringify(specs, null, 2));

module.exports = specs;
