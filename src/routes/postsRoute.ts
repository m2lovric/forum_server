import express from 'express';
import { createPost } from '../controllers/postsController';

export const postsRoute = express.Router();

postsRoute.post('/message', async (req, res) => {
  const { message } = req.body;
  const post = await createPost(message);

  if (post) {
    res.status(200).json({ status: 'Message sent' });
  } else {
    res.status(400).json({ status: 'Bad request' });
  }
});
