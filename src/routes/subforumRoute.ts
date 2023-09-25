import express from 'express';
import { getData } from '../controllers/SubforumController';

export const subforumsRoute = express.Router();

subforumsRoute.get('/subforums', async (req, res) => {
  const subforums = await getData();
  res.json({ subforums });
});
