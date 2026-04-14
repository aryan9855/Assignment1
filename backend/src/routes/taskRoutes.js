const express = require('express');
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks (Admin sees all, User sees theirs)
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: {type: string}
 *               description: {type: string}
 *               status: {type: string, enum: [pending, in-progress, completed]}
 */
router.route('/')
  .get(getTasks)
  .post(createTask);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get single task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security: [{ bearerAuth: [] }]
 */
router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
