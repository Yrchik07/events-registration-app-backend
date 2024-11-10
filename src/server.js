import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import rootRouter from './routers/index.js';
import cookieParser from "cookie-parser";
import { UPLOAD_DIR } from './constants/index.js';

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

    app.use(cookieParser());

    app.use(express.json());

    app.use('/upload', express.static(UPLOAD_DIR));

    app.use(rootRouter);

    app.use(notFoundMiddleware);

    app.use(errorHandlerMiddleware);


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}!`);
    });

};
