/** @format */

const express = require("express");
// const userController = require("../controllers/userController");
// const authController = require("../controllers/authController");
// const userMiddleware = require("../middlewares/userMIddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const { logger, setLabel } = require("../Logger/logger");
const bookController = require("../controllers/bookController");

const router = express.Router();
setLabel("bookRoutes");
logger.info("Accesing the endpoint");

/**
 * @swagger
 * /book/bookings:
 *   get:
 *     summary: Get All booking details
 *     description: Retrieve all booking details.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.get("/bookings", authMiddleware.verifyToken, bookController.getAllBookings);

/**
 * @swagger
 * /book/bookings:
 *   post:
 *     summary: Create a booking
 *     description: Create booking
 *     requestBody:
 *       description: Create a booking.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/bookVehicle'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     bookVehicle:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         area:
 *           type: string
 *         vehicleType:
 *           type: string
 *         acers:
 *           type: integer
 *         dateBooked:
 *           type: string
 *           format: date
 *         startTime:
 *           type: integer
 *         endTime:
 *           type: integer
 *         estimatedAmount:
 *           type: string
 */
router.post("/bookings", authMiddleware.verifyToken, bookController.bookVehicle);
router.patch("/bookings", authMiddleware.verifyToken, bookController.updateDetails);

module.exports = router;
