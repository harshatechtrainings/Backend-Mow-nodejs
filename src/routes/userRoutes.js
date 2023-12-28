// routes/authRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMIddleware");
const { logger, setLabel } = require("../Logger/logger");

const router = express.Router();
setLabel('userRoutes');
logger.info("Accesing the endpoint");

router.delete("/:user",userMiddleware.authorizeUserToDelete, userController.deleteUser);
router.get('/:username',userMiddleware.authorizeUserToDelete, userController.findUserByUsername);
router.get("/",userMiddleware.authorizeUserToDelete, userController.fetchUsers);


module.exports = router;
