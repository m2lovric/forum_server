import express from 'express';
import { createUser, verifyUser } from '../controllers/UserController';

const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
  const data = req.body;
  const user = await createUser(data);
  res.json(user);
});

userRoute.post('/login', async (req, res) => {
  const data = req.body;
  const verify = await verifyUser(data);

  if (verify) {
    res.status(200).json({ status: 'Verified' });
  } else {
    res.status(401).json({ status: 'Invalid credentials' });
  }
});
export { userRoute };
