import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import router from './routes';
import createConnection from '../database/index';
import AppError from '../errors/AppError';

const app = express();

createConnection();

app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        error: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);

export default app;
