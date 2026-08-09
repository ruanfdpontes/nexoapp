import { SignJWT, jwtVerify } from "jose";

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET não configurado.");
}

const secretKey = new TextEncoder().encode(secret);

export type AuthPayload = {
  userId: number;
  username: string;
  email: string;
  name: string;
  admin: boolean;
};

export async function createToken(payload: AuthPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}