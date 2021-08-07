const router = require('express').Router()

const usersController = require('../controllers/users.controllers')


/**
 * @swagger
 * tags:
 *  name: Users
 *  description: users endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/users:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: List all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns all the stored users
 */
router.get('/', usersController.getUsers)

/**
 * @swagger
 * paths:
 *  /api/users:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Creates a new user
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: new_user
 *         description: The User to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - username
 *             - password
 *           properties:
 *             name:
 *               type: string
 *               default: Fulano
 *             username:
 *               type: string
 *               default: Estrella_Platinada
 *             password:
 *               type: string
 *               default: 123
 *     responses:
 *       201:
 *         description: Returns the new created user
 */
router.post('/', usersController.createUser)

/**
 * @swagger
 * paths:
 *  /api/users/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *       - in: body
 *         name: user
 *         description: The content to update.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - username
 *             - password
 *           properties:
 *             name:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Return the updated user
 */
router.put('/:id', usersController.updateUser)


module.exports = router