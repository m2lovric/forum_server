import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface myUser extends express.Request {
  user: { username: string };
}

export function jwtAuth(
  req: myUser,
  res: express.Response,
  next: express.NextFunction
) {
  const { token } = req.cookies;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user as { username: string };
    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(403).json({ error: 'Permission denied' });
  }
}
