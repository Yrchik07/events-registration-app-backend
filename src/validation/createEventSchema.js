import Joi from 'joi';

export const createEventSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'any.required': 'Title is required',
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be at most 100 characters long',
  }),
  description: Joi.string().required().min(3).max(1000),
  eventDate: Joi.date().required(),
  organizer: Joi.string().required().min(3).max(100),
});
