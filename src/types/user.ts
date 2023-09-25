export interface UserDB {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}
