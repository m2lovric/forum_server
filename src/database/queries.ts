import sql from './db';

async function getData() {
  const subforums = await sql`
    select * from subforums
  `;

  return subforums;
}

export { getData };
