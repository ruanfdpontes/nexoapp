export default interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  admin: number;

  created_at: string;  
  updated_at: string;
  deleted_at: string;
}