import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import eventsRouter from './routers/events.js';

export const setupServer = () => {
    const app = express();
    const PORT = process.env.PORT;


    // app.use(
    //     pino({
    //         transport: {
    //             target: 'pino-pretty',
    //         },
    //     })
    // );

    app.use(cors());

    app.use(express.json());

    app.use(eventsRouter);

    app.use(notFoundMiddleware);

    app.use(errorHandlerMiddleware);


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
    });

};
