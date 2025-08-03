import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './config/env.js'; // Make sure this reads from process.env.PORT
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';

dotenv.config(); // Ensure .env variables are loaded (safe even if already loaded)

const app = express();

// Allow frontend origin & cookies for auth
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Use env or fallback
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// Default route
app.get('/', (req, res) => {
  res.send('🌐 Welcome to the Mini LinkedIn API');
});

// Global error handler
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    await connectToDatabase();
    const port = PORT || 5500; // fallback to 5500 if PORT not set
    app.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to DB:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
