const Project = require('../models/project');
const Task = require('../models/task');

async function createProject(req, res, next) {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description: description || '' });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
}

async function listProjects(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const total = await Project.countDocuments();
    const projects = await Project.find().skip((page - 1) * limit).limit(limit).sort({ created_at: -1 });
    res.json({ page, limit, total, data: projects });
  } catch (err) {
    next(err);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ status: 'error', message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ status: 'error', message: 'Project not found' });
    }
    await Task.deleteMany({ project_id: project._id });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { createProject, listProjects, getProject, deleteProject };
