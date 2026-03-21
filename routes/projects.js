const express = require('express');
const router = express.Router();
const { createProject, listProjects, getProject, deleteProject } = require('../controllers/projectsController');
const { projectSchema, validate } = require('../middlewares/validate');

router.post('/', validate(projectSchema), createProject);
router.get('/', listProjects);
router.get('/:id', getProject);
router.delete('/:id', deleteProject);

module.exports = router;
