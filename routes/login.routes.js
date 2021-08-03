const router = require('express').Router()

const loginControllers = require('../controllers/login.controllers')

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Login endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/login:
 *   post:
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
 *               default: Estrella_Platinada
 *             password:
 *               type: string
 *               default: 123
 *     responses:
 *       200:
 *         description: Returns the token of the authenticated user
 */
router.post('/', loginControllers.authLogin)


module.exports = router