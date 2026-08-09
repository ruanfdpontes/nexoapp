import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { createToken } from "@/lib/auth";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  admin: number;
  deleted_at: string | null;
};

export async function login(
  username: string,
  password: string
) {
  const userQuery = await db
    .query(`
      SELECT
        id,
        name,
        username,
        email,
        password,
        admin,
        deleted_at
      FROM users
      WHERE username = $1
      LIMIT 1
    `,
    [username]
  )

  const user = userQuery.rows[0];

  if (!user || user.deleted_at) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = await createToken({
    userId: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    admin: user.admin,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      admin: user.admin,
    },
  };
}