import express from 'express';
import { createUser } from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await createUser(username, email, password);
  res.json(user);
});

export { userRoute };
