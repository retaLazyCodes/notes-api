const router = require('express').Router()
const notesController = require('../controllers/notes.controllers')
const ROLE = require('../models/role.module')
const authorize = require('../middleware/authorize')

/**
 * @swagger
 * tags:
 *  name: Notes
 *  description: Notes endpoints
 */

/**
 * @swagger
 * paths:
 *  /api/notes:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Show all notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: Returns all the stored notes
 */
router.get('/', notesController.getAllNotes)
/**
 * @swagger
 * paths:
 *  /api/notes:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     summary: Creates a new note
 *     tags: [Notes]
 *     parameters:
 *       - in: body
 *         name: note
 *         description: The note to create.
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *               example: Jojo's part4 > part5
 *             important:
 *               type: boolean
 *               default: true
 *               example: false
 *     responses:
 *       201:
 *         description: Returns the created note
 *       401:
 *         description: You do not have necessary permissions for the resource
 */
router.post('/', authorize([ROLE.Admin, ROLE.User]), notesController.createNote)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     responses:
 *       200:
 *         description: Return the solicited note
 *       400:
 *         description: The ID is missing or is invalid
 */
router.get('/:id', notesController.getNoteById)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   put:
 *     security:
 *      - bearerAuth: []
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 60f86030c4970119bf774bb8
 *       - in: body
 *         name: note
 *         description: The content to update.
 *         schema:
 *           type: object
 *           required:
 *             - content
 *           properties:
 *             content:
 *               type: string
 *               example: "You say Python is slow? Then program in assembler"
 *             important:
 *               type: boolean
 *     responses:
 *       200:
 *         description: Return the updated note
 *       401:
 *         description: You do not have necessary permissions for the resource
 */
router.put('/:id', authorize([ROLE.Admin, ROLE.User]), notesController.updateNote)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 60f86030c4970119bf774bb8
 *     responses:
 *       204:
 *         description: Return a 'no content' status which indicates that the note was deleted successfully
 *       401:
 *         description: You do not have necessary permissions for the resource
 */
router.delete('/:id', authorize([ROLE.Admin, ROLE.User]), notesController.deleteNote)


module.exports = router
