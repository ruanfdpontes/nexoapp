import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import db from "../lib/db";

dotenv.config({ path: ".env" });

async function migrate() {
  try {
    console.log("🔄 Iniciando migrations...");

    // Cria a tabela que controla as migrations executadas
    await db.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsPath = path.join(
      process.cwd(),
      "src",
      "migrations"
    );

    if (!fs.existsSync(migrationsPath)) {
      console.log("Nenhuma pasta migrations encontrada.");
      return;
    }

    const files = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const version = file.replace(".sql", "");

      const result = await db.query(
        `
          SELECT version
          FROM schema_migrations
          WHERE version = $1
        `,
        [version]
      );

      if (result.rows.length > 0) {
        console.log(`✓ ${file} já foi executada.`);
        continue;
      }

      console.log(`▶ Executando ${file}...`);

      const sql = fs.readFileSync(
        path.join(migrationsPath, file),
        "utf-8"
      );

      await db.query("BEGIN");

      try {
        await db.query(sql);

        await db.query(
          `
            INSERT INTO schema_migrations (version)
            VALUES ($1)
          `,
          [version]
        );

        await db.query("COMMIT");

        console.log(`✓ ${file} executada com sucesso.`);
      } catch (error) {
        await db.query("ROLLBACK");
        throw error;
      }
    }

    console.log("✅ Migrations concluídas.");
  } catch (error) {
    console.error("❌ Erro ao executar migrations:");
    console.error(error);

    process.exitCode = 1;
  } finally {
    await db.end();
  }
}

migrate();