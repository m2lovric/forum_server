import sql from '../config/db';

export async function createPost(
  message: string,
  username: string,
  subforum_id: number
) {
  const getUser = await sql`
    select * from users
    where ${username}=username
    `;

  if (message !== undefined) {
    const post = await sql`
    insert into posts(message, user_id, subforum_id)
    values(${message}, ${getUser[0].id}, ${subforum_id})
    returning message
    `;

    return post;
  } else {
    return false;
  }
}
