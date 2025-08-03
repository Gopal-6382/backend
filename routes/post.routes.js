import { Router } from 'express';
import { createPost, getFeedPosts, getUserPosts } from '../controllers/post.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const postRouter = Router();

postRouter.post('/', authorize, createPost);
postRouter.get('/', getFeedPosts);
postRouter.get('/user/:id', getUserPosts);

export default postRouter;
