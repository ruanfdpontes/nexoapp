import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserService from "@/app/services/user.service"

export async function GET() {
  try {
    const users = await UserService.listUsers();

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
    const username = body.username?.trim().toLowerCase();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        {
          error: "Nome, usuário, e-mail e senha são obrigatórios.",
        },
        { status: 400 }
      );
    }

    const userFound = await UserService.getUser({
      username,
      email,
    });

    if (userFound) {
      return NextResponse.json(
        {
          error: "Esse usuário já existe.",
        },
        { status: 409 }
      );
    }

    const result = await UserService.createUser({
      name,
      username,
      email,
      password
    })

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso.",
        usuario: {
          id: Number(result.id),
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

    const userFound = await UserService.getUser({id})

    if (!userFound) {
      return NextResponse.json(
        { error: "Usuário não encontrado!" },
        { status: 404 }
      );
    }

    await UserService.deleteUser(userFound.id)

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