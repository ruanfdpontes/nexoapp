import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardTemplate from "./dashboard-template";

export default async function DashboardPage() {
    const cookieStore = await cookies();
  
    const token = cookieStore.get("nexoapp_token")?.value;
  
    if (!token) {
      redirect("/login");
    }
  
    const payload = await verifyToken(token);
  
    if (!payload) {
      redirect("/login");
    }
  
    if (payload.admin !== 0) {
      redirect("/users");
    }
  
    return <DashboardTemplate />;
}