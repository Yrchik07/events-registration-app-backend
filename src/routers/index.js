import { Router } from 'express';
import eventsRouter from './events.js';
import authRouter from './auth.js';

const rootRouter = Router();
rootRouter.use('/events', eventsRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
