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

router.get("/bookings", authMiddleware.verifyToken, bookController.getAllBookings);

router.post("/bookings", authMiddleware.verifyToken, bookController.bookVehicle);

router.patch("/bookings/:bookingId", authMiddleware.verifyToken, bookController.updateDetails);

module.exports = router;
