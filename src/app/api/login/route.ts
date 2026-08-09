import { NextResponse } from "next/server";
import { login } from "@/services/auth.service";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body.username?.trim();
    const password = body.password;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuário e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const result = await login(username, password);

    const response = NextResponse.json({
      message: "Login realizado com sucesso.",
      user: result.user,
    });

    response.cookies.set({
      name: "nexoapp_token",
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error(error);

    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      return NextResponse.json(
        { error: "Usuário ou senha inválidos." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}