import User from "@/app/interfaces/user.interface";
import { cookies } from "next/headers";

const getUserFromCookie = async (): Promise<User | null> => {
  const cookieStore = await cookies();

  const userCookie = cookieStore.get("nexoapp_user");

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch {
    return null;
  }
}

export default getUserFromCookie;