// 👇 Server action or server-only function
"use server";

import { cookies } from "next/headers";
import { verifyToken } from "../Function/verifyToken";

export const getCurrentUserToken = async () => {
  const token = (await cookies()).get("tutor")?.value;

  if (!token) return null;

  // Optionally, decode or verify the token (e.g. JWT)
  // const user = verifyToken(token); // implement this logic based on your app

  return token;
};

export const getCurrentUserRole = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) return false;
  console.log("Token-----", token);
  const user = verifyToken(token);
  if (user?.role !== "admin") {
    return false;
  }

  return true;
};

export const clearTokenAction = async () => {
  // To clear a cookie, set it with maxAge=0 or expires in the past
  (await cookies()).set("tutor", "", { path: "/", maxAge: 0 });
};
