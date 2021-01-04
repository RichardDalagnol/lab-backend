import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

import createConnection from '@shared/infra/typeorm';
import upload from '@config/upload';


import '@shared/container';
import cors from 'cors';
createConnection();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.tmpFolder))
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
