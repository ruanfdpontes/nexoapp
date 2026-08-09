import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LoginTemplate from "./login-template";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nexoapp_token")?.value;

  if (token) {
    const payload = await verifyToken(token);

    if (payload) {
      if (payload.admin === true) {
        redirect("/users");
      }

      redirect("/dashboard");
    }
  }

  return <LoginTemplate />;
}