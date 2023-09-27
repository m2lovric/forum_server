import express from 'express';
import { createPost } from '../controllers/postsController';

export const postsRoute = express.Router();

postsRoute.post('/message/:subforum', async (req: any, res) => {
  const { subforum } = req.params;
  const { message } = req.body;
  const username = req.user.username;
  const post = await createPost(message, username, Number(subforum));

  if (post) {
    res.status(200).json({ status: 'Message sent' });
  } else {
    res.status(400).json({ status: 'Bad request' });
  }
});
