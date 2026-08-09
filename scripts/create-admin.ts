import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import db from "../src/lib/db";

dotenv.config({ path: ".env.local" });

const name = process.env.ADMIN_NAME;
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const email = process.env.ADMIN_EMAIL;

if (!name || !username || !password) {
  console.error("As variáveis ADMIN_NAME, ADMIN_USERNAME e ADMIN_PASSWORD são obrigatórias.");
  process.exit(1);
}

const existingUser = db
  .prepare(`
    SELECT id
    FROM users
    WHERE username = ? OR email = ?
  `)
  .get(username, email);

if (existingUser) {
  console.log("Usuário administrador já existe.");
  process.exit(0);
}

const passwordHash = bcrypt.hashSync(password, 10);

db.prepare(`
  INSERT INTO users (
    name,
    username,
    email,
    password,
    admin
  )
  VALUES (?, ?, ?, ?, 1)
`).run(
  name,
  username,
  email,
  passwordHash
);

console.log("Administrador criado com sucesso!");
console.log(`Usuário: ${username}`);
console.log(`Senha: ${password}`);