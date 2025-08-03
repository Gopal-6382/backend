import Post from '../models/post.model.js';

export const createPost = async (req, res, next) => {
    try {
      const { content } = req.body;
      const userId = req.user._id; 
  
      const newPost = await Post.create({ content, author: userId });
  
      res.status(201).json({ success: true, post: newPost });
    } catch (error) {
      next(error);
    }
  };
  

export const getFeedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};
