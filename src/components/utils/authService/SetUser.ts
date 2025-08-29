// 👇 Server action function
"use server";

import { cookies } from "next/headers";
export const setTokenAction = async (token: string) => {
  (await cookies()).set("z_br", token);
};
