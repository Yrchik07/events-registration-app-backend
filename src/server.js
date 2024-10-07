import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEventById, getEvents } from './services/events.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';

export const setupServer = () => {
    const app = express();
    const PORT = process.env.PORT;


    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        })
    );

    app.use(cors());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.get('/events', async (req, res) => {
        const events = await getEvents();
        res.json({
            status: 200,
            message: 'Events fetched successfully',
            data: events,
        });
    });

    app.get('/events/:eventId', async (req, res) => {
        const eventId = req.params.eventId;
        const events = await getEventById(eventId);

        if(!events) {
            return res.status(404).json({
                status: 404,
                message: `Event with id ${eventId} not found!`,
            });
        }
        res.json({
            status: 200,
            message: `Successfully found event with id ${eventId} not found!`,
            data: events,
        });
    });

    app.use(notFoundMiddleware);

    app.use(errorHandlerMiddleware);


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
    });

};
