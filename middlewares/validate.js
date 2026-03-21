const Joi = require('joi');

const projectSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  description: Joi.string().allow('', null),
});

const taskSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('todo', 'in-progress', 'done').required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
  due_date: Joi.date().iso().required(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, convert: true });
  if (error) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', details: error.details.map(d => d.message) });
  }
  next();
};

module.exports = { projectSchema, taskSchema, validate };
