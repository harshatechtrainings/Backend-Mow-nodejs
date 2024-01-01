/** @format */

const express = require("express");
const { logger, setLabel } = require("../../Logger/logger");
const pilotController = require("../../controllers/pilot/pilotController");

const router = express.Router();
setLabel("pilotRoutes");
logger.info("Accesing the endpoint");

router.post("/register", pilotController.registerPilot);

router.put("/admin/register/:id", pilotController.updatePilotRegistrationByAdmin);

module.exports = router;
