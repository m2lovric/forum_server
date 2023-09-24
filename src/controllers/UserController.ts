import sql from '../config/db';

async function createUser(username: string, email: string, password: string) {
  const user = await sql`
    insert into users(username, email, password)
    values(${username}, ${email}, ${password})
    returning username
  `;

  return { status: 'User created', user };
}

export { createUser };
