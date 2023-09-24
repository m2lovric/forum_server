import express from 'express';
import { createUser, verifyUser } from '../controllers/UserController';

interface User {
  username: string;
  email: string;
  password: string;
}
const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
  const data: User = req.body;
  const user = await createUser(data);

  if (user) {
    res.status(200).json({ status: 'User created' });
  } else {
    res.status(401).json({ status: 'Missing credentials' });
  }
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
