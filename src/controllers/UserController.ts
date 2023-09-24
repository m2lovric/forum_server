import sql from '../config/db';
import bcrypt from 'bcrypt';

async function createUser(data: {
  username: string;
  email: string;
  password: string;
}) {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  const user = await sql`
    insert into users(username, email, password)
    values(${data.username}, ${data.email}, ${data.password})
    returning username
  `;

  return { status: 'User created', user };
}

async function verifyUser(data: { username: string; password: string }) {
  const user = await sql`
    select * from users
    where ${data.username}=username
  `;

  console.log(user[0].password);
  console.log(data.password);
  return await bcrypt.compare(data.password, user[0].password);
}

export { createUser, verifyUser };
