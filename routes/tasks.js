const express = require('express');
const router = express.Router();
const { createTask, listTasks, updateTask, deleteTask } = require('../controllers/tasksController');
const { taskSchema, validate } = require('../middlewares/validate');

router.post('/projects/:project_id/tasks', validate(taskSchema), createTask);
router.get('/projects/:project_id/tasks', listTasks);

router.put('/tasks/:id', validate(taskSchema), updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
