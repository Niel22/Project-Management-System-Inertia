import Joi from "joi";

export const createProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
        .min(8)
        .max(32)
        .required(),
    image: Joi.required(),
    status: Joi.string().required(),
    due_date: Joi.date().raw().required(),
});

export const updateProjectSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
        .min(8)
        .max(32)
        .required(),
    image: Joi.optional(),
    status: Joi.string().required(),
    due_date: Joi.date().raw().required(),
});

