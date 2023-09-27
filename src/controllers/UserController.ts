import sql from '../config/db';
import bcrypt from 'bcrypt';
import { User } from '../types/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function createUser(data: User) {
  if (
    data.email !== undefined &&
    data.password !== undefined &&
    data.username !== undefined
  ) {
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const user = await sql`
    insert into users(username, email, password)
    values(${data.username}, ${data.email}, ${data.password})
    returning username
  `;

    return true;
  } else {
    return false;
  }
}

async function verifyUser(data: User) {
  const user = await sql`
    select * from users
    where ${data.username}=username
  `;

  if (await bcrypt.compare(data.password, user[0].password)) {
    const token = jwt.sign(
      { username: data.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      }
    );

    return token;
  } else {
    return false;
  }
}
export { createUser, verifyUser };
