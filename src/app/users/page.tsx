import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import UserTemplate from "./user-template";

export default async function UsersPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("nexoapp_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyToken(token);

  if (!payload) {
    redirect("/login");
  }

  if (payload.admin !== 1) {
    redirect("/dashboard");
  }

  return <UserTemplate />;
}