import { Router } from "express";
import { getEventByIdController, getEventsController } from "../controllers/events.js";
import { ctrWrapper } from "../middlewares/ctrWrapper.js";

const eventsRouter = Router();
const getEventsHandler =ctrWrapper(getEventsController);
const getEventByIdHandler = ctrWrapper(getEventByIdController);

eventsRouter.get('/events', getEventsHandler);

eventsRouter.get('/events/:eventId', getEventByIdHandler);

export default eventsRouter;
