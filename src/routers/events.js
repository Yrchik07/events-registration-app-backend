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

eventsRouter.use('/:eventId', validateMongoId('eventId'));

eventsRouter.get('/', getEventsHandler);

eventsRouter.get('/:eventId', getEventByIdHandler);

eventsRouter.post('/', validateBody(createEventSchema), postEventHandler);

eventsRouter.patch('/:eventId', validateBody(updateEventSchema), patchEventHandler);

eventsRouter.put('/:eventId', validateBody(createEventSchema), putEventHandler);

eventsRouter.delete('/:eventId', deleteEventHandler);

export default eventsRouter;
