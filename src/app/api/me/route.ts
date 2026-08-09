import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexoapp_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Não autenticado" },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    userId: payload.userId,
    username: payload.username,
    email: payload.email,
    name: payload.name,
    admin: payload.admin,
  });
}