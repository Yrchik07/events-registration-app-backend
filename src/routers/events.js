import { Router } from "express";
import { getEventByIdController, getEventsController } from "../controllers/events.js";
import { ctrWrapper } from "../middlewares/ctrWrapper.js";

const eventsRouter = Router();
const getEventsHandler =ctrWrapper(getEventsController);
const getEventByIdHandler = ctrWrapper(getEventByIdController);
const postEventHandler = ctrWrapper(createEventController);

eventsRouter.get('/events', getEventsHandler);

eventsRouter.get('/events/:eventId', getEventByIdHandler);

eventsRouter.post('/events', postEventHandler);

export default eventsRouter;
