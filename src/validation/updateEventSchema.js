import Joi from 'joi';

export const updateEventSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(3).max(1000),
  eventDate: Joi.date(),
  organizer: Joi.string().min(3).max(100),
});
