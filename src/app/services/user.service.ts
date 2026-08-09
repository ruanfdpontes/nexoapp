import bcrypt from "bcryptjs";
import db from "@/lib/db";

const UserService = {
  async listUsers() {
    const result = await db.query(
      `
        SELECT
          id,
          name,
          username,
          email,
          created_at
        FROM users
        WHERE deleted_at IS NULL
          AND admin = FALSE
        ORDER BY name
      `
    );

    return result.rows;
  },
  async getUser(data: {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
  }) {
    const conditions: string[] = []; 
    
    const values: unknown[] = []; 
    if (data.id !== undefined) { 
      values.push(data.id); 
      conditions.push(`id = $${values.length}`); 
    } 

    if (data.name !== undefined) { 
      values.push(data.name); 
      conditions.push(`name = $${values.length}`); 
    } 

    if (data.username !== undefined) { 
      values.push(data.username.toLocaleLowerCase()); 
      conditions.push(`username = $${values.length}`); 
    } 

    if (data.email !== undefined) { 
      values.push(data.email.toLocaleLowerCase()); 
      conditions.push(`email = $${values.length}`); 
    } 

    if (conditions.length === 0) { 
      return undefined; 
    } 

    const result = await db.query( 
      ` 
        SELECT id, 
          name, username, email, password, 
          admin, created_at, updated_at, 
          deleted_at FROM users 
        WHERE ${conditions.join(" OR ")} 
        LIMIT 1 
      `, 
      values 
    ); 

    return result.rows[0];
  },
  async createUser(data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    const { name, username, email, password } = data;

    const existingUser = await db.query(
      `
        SELECT id
        FROM users
        WHERE username = $1
           OR email = $2
        LIMIT 1
      `,
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error("USER_ALREADY_EXISTS");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
        INSERT INTO users (
          name,
          username,
          email,
          password,
          admin
        )
        VALUES ($1, $2, $3, $4, FALSE)
        RETURNING
          id,
          name,
          username,
          email
      `,
      [name, username, email, passwordHash]
    );

    return result.rows[0];
  },

  async deleteUser(id: number) {
    await db.query(
      `
        UPDATE users
        SET
          updated_at = CURRENT_TIMESTAMP,
          deleted_at = CURRENT_TIMESTAMP
        WHERE id = $1
          AND deleted_at IS NULL
      `,
      [id]
    );
  },
};

export default UserService;