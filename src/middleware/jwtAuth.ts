import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

export interface UserAuth extends express.Request {
  user: string | jwt.JwtPayload;
}

type jwtAuthParams = {
  req: UserAuth;
  res: express.Response;
  next: express.NextFunction;
};

export async function jwtAuth({ req, res, next }: jwtAuthParams) {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie('token');
    res.status(403).json({ error: 'Permission denied' });
  }
}
