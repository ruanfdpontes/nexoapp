import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/lib/db";

export async function GET() {
  try {
    const users = db
      .prepare(`
        SELECT
          id,
          name,
          username,
          email,
          created_at
        FROM users
        WHERE deleted_at IS NULL AND
            admin = 0
        ORDER BY name
      `)
      .all();

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error("Erro ao listar usuários:", error);

    return NextResponse.json(
      { error: "Erro ao carregar usuários." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const username = body.username?.trim();
    const email = body.email?.trim();
    const password = body.password;

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        {
          error: "Nome, usuário, e-mail e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    let userFound = db
      .prepare(`
        SELECT id
        FROM users
        WHERE username = ? OR
            email = ?
        LIMIT 1
      `)
      .get(username, email);

    if (userFound) {
      return NextResponse.json(
        {
          error: "Esse usuário já existe.",
        },
        { status: 409 }
      );
    }
    
    const passwordHash = await bcrypt.hash(password, 10);

    const result = db
      .prepare(`
        INSERT INTO users (
          name,
          username,
          email,
          password,
          admin
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        name,
        username,
        email,
        passwordHash,
        0
      );

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso.",
        usuario: {
          id: Number(result.lastInsertRowid),
          name,
          username,
          email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const id = Number(body.id);

    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário é obrigatório." },
        { status: 400 }
      );
    }

     const result = db
      .prepare(`
        UPDATE users
        SET updated_at = CURRENT_TIMESTAMP,
            deleted_at = CURRENT_TIMESTAMP
        WHERE id = ?
          AND deleted_at IS NULL
      `)
      .run(id);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Usuário excluído com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}