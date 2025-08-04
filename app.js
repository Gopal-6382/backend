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

// ✅ Allowed frontend origins (local + Vercel)
const allowedOrigins = [
  'http://localhost:5173', // local frontend dev
  'https://linkden.vercel.app', // your live frontend
  'https://creative-creativity-new.up.railway.app', // optional: backend self-call
];

// ✅ CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log('🌐 Request Origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('❌ Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies/token headers
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// ✅ Default route
app.get('/', (req, res) => {
  res.send('🌐 Welcome to the Mini LinkedIn API');
});

// ✅ Error handler
app.use(errorMiddleware);

// ✅ Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
