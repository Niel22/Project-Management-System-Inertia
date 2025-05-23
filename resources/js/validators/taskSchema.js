import Joi from "joi";

export const createTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
        .min(8)
        .max(32)
        .required(),
    image: Joi.required(),
    status: Joi.string().required(),
    due_date: Joi.date().raw().required(),
    priority: Joi.string().required(),
    assigned_to: Joi.number().required(),
    project_id: Joi.number().required()
});

export const updateTaskSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
        .min(8)
        .max(32)
        .required(),
    image: Joi.required(),
    status: Joi.string().required(),
    due_date: Joi.date().raw().required(),
    priority: Joi.string().required(),
    assigned_to: Joi.number().required(),
    project_id: Joi.number().required()
});

