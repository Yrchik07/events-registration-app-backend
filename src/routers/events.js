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
import { authenticate } from '../middlewares/authenticate.js';
import { checkChildPermissions } from '../middlewares/checkRoles.js';
import { upload } from '../validation/uploader.js';

const eventsRouter = Router();
const getEventsHandler = ctrWrapper(getEventsController);
const getEventByIdHandler = ctrWrapper(getEventByIdController);
const postEventHandler = ctrWrapper(createEventController);
const patchEventHandler = ctrWrapper(patchEventController);
const putEventHandler = ctrWrapper(putEventController);
const deleteEventHandler = ctrWrapper(deleteEventByIdController);

eventsRouter.use('/:eventId', validateMongoId('eventId'), authenticate);
eventsRouter.use('/', authenticate);

eventsRouter.get('/', getEventsHandler);

eventsRouter.get('/:eventId', getEventByIdHandler);

eventsRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createEventSchema),
  postEventHandler,
);

eventsRouter.patch(
  '/:eventId',
  checkChildPermissions('teacher', 'parent'),
  validateBody(updateEventSchema),
  patchEventHandler,
);

eventsRouter.put('/:eventId', validateBody(createEventSchema), putEventHandler);

eventsRouter.delete('/:eventId', deleteEventHandler);

export default eventsRouter;
