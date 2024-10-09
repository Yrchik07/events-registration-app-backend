import { Router } from 'express';
import {
  createEventController,
  deleteEventByIdController,
  getEventByIdController,
  getEventsController,
  patchEventController,
  putEventController,
} from '../controllers/events.js';
import { ctrWrapper } from '../middlewares/ctrWrapper.js';

const eventsRouter = Router();
const getEventsHandler = ctrWrapper(getEventsController);
const getEventByIdHandler = ctrWrapper(getEventByIdController);
const postEventHandler = ctrWrapper(createEventController);
const patchEventHandler = ctrWrapper(patchEventController);
const putEventHandler = ctrWrapper(putEventController);
const deleteEventHandler = ctrWrapper(deleteEventByIdController);

eventsRouter.get('/events', getEventsHandler);

eventsRouter.get('/events/:eventId', getEventByIdHandler);

eventsRouter.post('/events', postEventHandler);

eventsRouter.patch('/events/:eventId', patchEventHandler);

eventsRouter.put('/events/:eventId', putEventHandler);

eventsRouter.delete('/events/:eventId', deleteEventHandler);

export default eventsRouter;
