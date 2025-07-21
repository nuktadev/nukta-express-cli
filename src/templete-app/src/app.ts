import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { join } from 'path';
import notFoundMiddleware from './app/middlewares/not-found';
import errorHandler from './app/middlewares/error-handler';


dotenv.config({ path: join(process.cwd(), '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my-api API',
    version: '1.0.0',
    status: 'running'
  });
});

app.use('/api/v1', routes);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandler);

export default app;
