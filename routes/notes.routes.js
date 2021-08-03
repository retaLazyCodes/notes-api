const router = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const notesController = require('../controllers/notes.controllers')

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
 *     summary: Creates a new note
 *     tags: [Notes]
 *     parameters:
 *       - in: header
 *         name: token
 *         type: string
 *         default: Bearer <your token>
 *         example: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
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
 */
router.post('/', userExtractor, notesController.createNote)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *     responses:
 *       200:
 *         description: Return the solicited note
 */
router.get('/:id', notesController.getNoteById)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 60f86030c4970119bf774bb8
 *       - in: header
 *         name: token
 *         type: string
 *         default: Bearer <your token>
 *         example: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
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
 */
router.put('/:id', userExtractor, notesController.updateNote)
/**
 * @swagger
 * paths:
 *  /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *       - in: header
 *         name: token
 *         type: string
 *     responses:
 *       204:
 *         description: Return a 'no content' status which indicates that the note was deleted successfully
 */
router.delete('/:id', userExtractor, notesController.deleteNote)


module.exports = router
