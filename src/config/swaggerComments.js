/** @format */

// for post BookingDetails
/**
 * @swagger
 * /book/bookings:
 *   post:
 *     tags:
 *        - Bookings
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

// pathc book

/**
 * @swagger
 * /book/bookings/{bookingId}:
 *   patch:
 *     tags:
 *        - Bookings
 *     summary: Update booking details
 *     description: Update booking details based on bookingId.
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update booking details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 $ref: '#/components/schemas/BookingUpdate'
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
 *   schemas:
 *     BookingUpdate:
 *       type: object
 *       properties:
 *           vehicleNo:
 *             type: string
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           number:
 *             type: string
 *           startTime:
 *              type: string
 *           endTime:
 *              type: string
 *           status:
 *              type: string
 */

// Get all bookings

/**
 * @swagger
 * /book/bookings:
 *   get:
 *     tags:
 *        - Bookings
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

// put users

/**
 * @swagger
 * /users/{username}:
 *   put:
 *     tags:
 *        - Users
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

// get all users
/**
 * @swagger
 * /users/:
 *   get:
 *     tags:
 *        - Users
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

// get usersby username

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     tags:
 *          - Users
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

// delete users by username

/**
 * @swagger
 * /users/{user}:
 *   delete:
 *     tags:
 *        - Users
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

// pilot register

/**
 * @swagger
 * /pilot/register:
 *   post:
 *     tags:
 *        - Pilot
 *     summary: Register a pilot
 *     description: Register a new pilot.
 *     requestBody:
 *       description: Pilot registration details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pilot:
 *                  $ref: '#/components/schemas/PilotRegistration'
 *     responses:
 *       200:
 *         description: Successful registration
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PilotRegistration:
 *       type: object
 *       properties:
 *          Name:
 *             type: string
 *          Gmail:
 *             type: string
 *          DOB:
 *             type: string
 *             format: date
 *          MobileNumber:
 *             type: string
 *          VehicleNo:
 *             type: string
 *          VehicleType:
 *             type: string
 *          vehicleOwnerName:
 *             type: string
 *          vehicleDriverName:
 *             type: string
 *          Address:
 *             type: string
 *          File:
 *             type: string
 *          CreatedDate:
 *             type: string
 *             format: date
 *          regStatus:
 *              type: string
 */

// pilot update by admin
/**
 * @swagger
 * /pilot/admin/register/{id}:
 *   put:
 *     tags:
 *      - Pilot
 *     summary: Update admin registration by ID
 *     description: Update details of an admin registration by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the admin registration to update.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Admin registration details.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin:
 *                  $ref: '#/components/schemas/AdminRegistrationUpdate'
 *     responses:
 *       200:
 *         description: Successful update
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AdminRegistrationUpdate:
 *           type: object
 *           properties:
 *             vehicleCompanyCode:
 *               type: string
 *             RelocationArea:
 *               type: string
 *             RelocationAreaCode:
 *               type: string
 *             CreatedDate:
 *               type: string
 *               format: date
 *             RelocationDistrict:
 *               type: string
 *             RelocationState:
 *               type: string
 *             LastUpdated:
 *               type: string
 *               format: date
 */
