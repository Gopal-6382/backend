import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-domain.vercel.app', // replace with your deployed frontend URL
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Mini LinkedIn API');
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
