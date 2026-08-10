import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const userCookie =
      cookieStore.get("nexoapp_user");

    if (!userCookie) {
      return NextResponse.json(
        { error: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    const user = JSON.parse(userCookie.value);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Sessão inválida." },
      { status: 401 }
    );
  }
}