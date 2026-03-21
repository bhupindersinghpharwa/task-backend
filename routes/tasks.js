const express = require('express');
const router = express.Router();
const { createTask, listTasks, updateTask, deleteTask } = require('../controllers/tasksController');
const { taskSchema, validate } = require('../middlewares/validate');

router.post('/:project_id/tasks', validate(taskSchema), createTask);
router.get('/:project_id/tasks', listTasks);

router.put('/:id', validate(taskSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
