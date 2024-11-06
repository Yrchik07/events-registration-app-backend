import {
  createEvent,
  deleteEventById,
  getEventById,
  getEvents,
  upsertEvent,
} from '../services/events.js';
import { parseFilters } from '../utils/parseFilters.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getEventsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = req.query;
  const filter = parseFilters(req.query);
  const events = await getEvents({ page, perPage, sortBy, sortOrder, filter, userId: req.user._id });
  res.json({
    status: 200,
    message: 'Events fetched successfully',
    data: events,
  });
};

export const getEventByIdController = async (req, res) => {
  const eventId = req.params.eventId;
  const events = await getEventById(eventId);

  res.json({
    status: 200,
    message: `Successfully found event with id ${eventId} not found!`,
    data: events,
  });
};
export const createEventController = async (req, res) => {
  const { body, file } = req;
  // const { body } = req;
  const events = await createEvent({...body, avatar: file}, req.user._id);
  // const events = await createEvent(body, req.user._id);

  res.status(201).json({
    status: 201,
    message: `Successfully created event!`,
    data: events,
  });
};

export const patchEventController = async (req, res) => {
  const { body } = req;
  const { eventId } = req.params;
  const { event } = await upsertEvent(eventId, body);

  res.status(200).json({
    status: 200,
    message: `Successfully patched event!`,
    data: event,
  });
};
export const putEventController = async (req, res) => {
  const { body } = req;
  const { eventId } = req.params;
  const { isNew, event } = await upsertEvent(eventId, body, { upsert: true });
  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully updated event!`,
    data: event,
  });
};
export const deleteEventByIdController = async (req, res) => {
  const id = req.params.eventId;
  await deleteEventById(id);
  res.status(204).send();
};
