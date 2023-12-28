// routes/authRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
// const authMiddleware = require("../middlewares/authMiddleware");
const { logger, setLabel } = require("../Logger/logger");

const router = express.Router();
setLabel('userRoutes');
logger.info("Accesing the endpoint");

router.delete("/:user", userController.deleteUser);
router.get('/:username', userController.findUserByUsername);
router.get("/", userController.fetchUsers);


module.exports = router;
