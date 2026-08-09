import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import db from "../lib/db";

dotenv.config({ path: ".env" });

const name = process.env.ADMIN_NAME;
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const email = process.env.ADMIN_EMAIL;

if (!name || !username || !password || !email) {
  console.error(
    "As variáveis ADMIN_NAME, ADMIN_USERNAME, ADMIN_PASSWORD e ADMIN_EMAIL são obrigatórias."
  );

  process.exit(1);
}

async function seedAdmin() {
  try {
    const existingUser = await db.query(
      `
        SELECT id
        FROM users
        WHERE username = $1 OR email = $2
        LIMIT 1
      `,
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      console.log("Usuário administrador já existe.");
      return;
    }

    if (!password) {
      console.log("A variável ADMIN_PASSWORD é obrigatória.");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      `
        INSERT INTO users (
          name,
          username,
          email,
          password,
          admin
        )
        VALUES ($1, $2, $3, $4, TRUE)
      `,
      [name, username, email, passwordHash]
    );

    console.log("Administrador criado com sucesso!");
    console.log(`Usuário: ${username}`);
  } catch (error) {
    console.error("Erro ao criar administrador:", error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

seedAdmin();