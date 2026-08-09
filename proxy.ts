import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET não configurado.");
}

const secretKey = new TextEncoder().encode(secret);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("nexoapp_token")?.value;

  if (pathname === "/login") {
    if (!token) {
      return NextResponse.next();
    }

    const payload = await verifyToken(token);

    // Token inválido ou expirado
    if (!payload) {
      return NextResponse.next();
    }

    // Administrador
    if (payload.admin === 1) {
      return NextResponse.redirect(
        new URL("/users", request.url)
      );
    }

    // Usuário comum
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  const protectedRoute =
    pathname.startsWith("/users") ||
    pathname.startsWith("/dashboard");
    
  if (!protectedRoute) {
    return NextResponse.next();
  }

  // Não está autenticado
  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const payload = await verifyToken(token);

  // Token inválido ou expirado
  if (!payload) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Proteção da área administrativa
  if (
    pathname.startsWith("/users") &&
    payload.admin !== 1
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/users/:path*",
    "/dashboard/:path*"
  ],
};