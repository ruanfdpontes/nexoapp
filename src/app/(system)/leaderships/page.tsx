import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import LeadershipsTemplate from "./leadership-template";
import LeadershipTemplate from "./leadership-template";

export default async function LeadershipPage() {
    const cookieStore = await cookies();
  
    const token = cookieStore.get("nexoapp_token")?.value;
  
    if (!token) {
      redirect("/login");
    }
  
    const payload = await verifyToken(token);
  
    if (!payload) {
      redirect("/login");
    }
  
    if (payload.admin === true) {
      redirect("/users");
    }
  
    return <LeadershipTemplate />;
}