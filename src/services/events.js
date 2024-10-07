import createHttpError from 'http-errors';
import { Events } from '../db/models/events.js';

export const getEvents = async () => {
  return await Events.find();
};

export const getEventById = async (id) => {
  const event = await Events.findById(id);

  if (!event) {
    throw createHttpError(404, 'Event not found');
  }

  return event;
};
