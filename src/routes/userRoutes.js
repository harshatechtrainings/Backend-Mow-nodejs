/** @format */

// routes/authRoutes.js
const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userMiddleware = require("../middlewares/userMIddleware");
const { logger, setLabel } = require("../Logger/logger");
const bookController = require("../controllers/bookController");

const router = express.Router();
setLabel("userRoutes");
logger.info("Accesing the endpoint");
/**
 * @swagger
 * /users/{user}:
 *   delete:
 *     summary: Get user by username
 *     description: Deletes user details based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
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
router.delete("/:user", userMiddleware.authorizeUserToDelete, userController.deleteUser);

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get user by username
 *     description: Retrieve user details based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
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
router.get("/:username", userMiddleware.authorizeUserToDelete, userController.findUserByUsername);

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get All Users
 *     description: Retrieve all users details.
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
router.get("/", userMiddleware.authorizeUserToDelete, userController.fetchUsers);

/**
 * @swagger
 * /users/{username}:
 *   put:
 *     summary: Update user by username
 *     description: Updates user details based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User data to update.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
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
 *     UserUpdate:
 *       type: object
 *       properties:
 *         activated:
 *           type: boolean
 */
router.put("/:username", userMiddleware.authorizeUserToDelete, userController.updateUser);

router.get("/verify", authController.verify);

module.exports = router;
