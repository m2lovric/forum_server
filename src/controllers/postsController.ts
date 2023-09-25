import sql from '../config/db';

export async function createPost(message: string) {
  if (message !== undefined) {
    const post = await sql`
    insert into posts(message, user_id, subforum_id)
    values(${message}, ${2}, ${2})
    returning message
    `;

    return post;
  } else {
    return false;
  }
}
