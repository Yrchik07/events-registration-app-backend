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
export const createEvent = async (payload) => {
  const event = await Events.create(payload);

  return event;
};
export const upsertEvent = async (id, payload, options = {}) => {
  const rawResult = await Events.findByIdAndUpdate(id, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) {
    throw createHttpError(404, 'Event not found');
  }

  return {
    event: rawResult.value,
    isNew: !rawResult?.lastErrorObject?.updatedExisting,
  };
};

export const deleteEventById = async (id) => {
  await Events.findByIdAndDelete(id);
};
