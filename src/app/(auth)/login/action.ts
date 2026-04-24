"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(preState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard", // biar kita bisa handle sendiri
    });
    return { res, success: "Login berhasil" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Login gagal, pastikan email dan password benar" };
    }
    throw error; // lempar error lain ke global error handler
  }
}
