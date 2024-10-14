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
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createEventSchema } from '../validation/createEventSchema.js';
import { updateEventSchema } from '../validation/updateEventSchema.js';

const eventsRouter = Router();
const getEventsHandler = ctrWrapper(getEventsController);
const getEventByIdHandler = ctrWrapper(getEventByIdController);
const postEventHandler = ctrWrapper(createEventController);
const patchEventHandler = ctrWrapper(patchEventController);
const putEventHandler = ctrWrapper(putEventController);
const deleteEventHandler = ctrWrapper(deleteEventByIdController);

eventsRouter.use('/events/:eventId', validateMongoId('eventId'));

eventsRouter.get('/events', getEventsHandler);

eventsRouter.get('/events/:eventId', getEventByIdHandler);

eventsRouter.post('/events', validateBody(createEventSchema), postEventHandler);

eventsRouter.patch('/events/:eventId', validateBody(updateEventSchema), patchEventHandler);

eventsRouter.put('/events/:eventId', validateBody(createEventSchema), putEventHandler);

eventsRouter.delete('/events/:eventId', deleteEventHandler);

export default eventsRouter;
