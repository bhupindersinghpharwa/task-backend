const Task = require('../models/task');
const Project = require('../models/project');

async function createTask(req, res, next) {
  try {
    const project = await Project.findById(req.params.project_id);
    if (!project) {
      return res.status(404).json({ status: 'error', message: 'Project not found' });
    }
    const { title, description, status, priority, due_date } = req.body;
    const task = await Task.create({
      project_id: project._id,
      title,
      description: description || '',
      status,
      priority,
      due_date
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function listTasks(req, res, next) {
  try {
    const project = await Project.findById(req.params.project_id);
    if (!project) {
      return res.status(404).json({ status: 'error', message: 'Project not found' });
    }
    const filter = { project_id: project._id };
    if (req.query.status) {
      const status = req.query.status;
      if (!['todo', 'in-progress', 'done'].includes(status)) {
        return res.status(400).json({ status: 'error', message: 'status must be todo, in-progress, or done' });
      }
      filter.status = status;
    }
    let query = Task.find(filter);
    if (req.query.sort === 'due_date' || req.query.sort === 'due_date_asc') {
      query = query.sort({ due_date: 1 });
    } else if (req.query.sort === 'due_date_desc') {
      query = query.sort({ due_date: -1 });
    }
    const tasks = await query.exec();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    task.title = title;
    task.description = description || '';
    task.status = status;
    task.priority = priority;
    task.due_date = due_date;
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ status: 'error', message: 'Task not found' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { createTask, listTasks, updateTask, deleteTask };
