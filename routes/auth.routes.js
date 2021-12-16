const router = require('express').Router()
const authController = require('../controllers/auth.controllers')
const ROLE = require('../models/role.module')
const authorize = require('../middleware/authorizeUserRole')

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Authentication endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/auth/login:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Authenticate a user
 *     tags: [Login]
 *     parameters:
 *       - in: body
 *         name: user_data
 *         description: The data of user to authenticate.
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               default: reta730
 *             password:
 *               type: string
 *               default: 123
 *     responses:
 *       200:
 *         description: Returns the token of the authenticated user
 *       401: 
 *         description: The username or password is invalid
 */
router.post('/login', authController.authLogin)

/**
 * @swagger
 * paths:
 *  /api/auth/me:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Show the data of the authenticated user
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: Returns the data of the authenticated user
 */
router.get('/me', authorize([ROLE.Admin, ROLE.User]), authController.authMe)

module.exports = router