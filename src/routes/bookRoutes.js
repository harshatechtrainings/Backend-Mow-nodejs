/** @format */

const express = require("express");
// const userController = require("../controllers/userController");
// const authController = require("../controllers/authController");
// const userMiddleware = require("../middlewares/userMIddleware");
const { logger, setLabel } = require("../Logger/logger");
const bookController = require("../controllers/bookController");

const router = express.Router();
setLabel("bookRoutes");
logger.info("Accesing the endpoint");

router.get("/bookings", bookController.getAllBookings);
router.post("/bookings", bookController.bookVehicle);
router.patch("/bookings", bookController.updateDetails);

module.exports = router;
