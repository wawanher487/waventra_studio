"use server";

import { connectionToDatabase } from "@/lib/mongodb";
import { User } from "@/models/users";
import bcrypt from "bcryptjs";

export async function registerAction(prevState: unknown, formData: FormData) {
  // 1. ambil data dari form
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 2. validasi data
  if (!name || !email || !password) {
    return { error: "Semua Fields Harus Di Isi" };
  }

  //connect databse
  await connectionToDatabase();

  // 3. cek email sudah terdafatar atau belum
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    return { error: "Email Sudah Terdaftar" };
  }

  //4. hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. simpan user kedatabase
  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { success: "Registerasi Berhasil" };
}
