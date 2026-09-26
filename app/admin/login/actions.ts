"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error: string;
};

function getLoginErrorMessage(message: string) {
  const authMessage = message.toLowerCase();

  if (authMessage.includes("email not confirmed")) {
    return "บัญชีนี้ยังไม่ได้ยืนยันอีเมลใน Supabase โปรเจกต์ปัจจุบัน";
  }

  if (authMessage.includes("rate limit")) {
    return "Supabase จำกัดจำนวนการลองเข้าสู่ระบบชั่วคราว กรุณารอสักครู่แล้วลองใหม่";
  }

  if (authMessage.includes("invalid login credentials")) {
    return "ไม่พบอีเมลหรือรหัสผ่านนี้ใน Supabase โปรเจกต์ปัจจุบัน กรุณาตรวจสอบบัญชีใหม่อีกครั้ง";
  }

  if (authMessage.includes("fetch failed")) {
    return "เชื่อมต่อ Supabase ไม่ได้ กรุณาตรวจสอบว่าโปรเจกต์ยังเปิดใช้งานและไม่เกินโควตา";
  }

  return `Supabase ไม่อนุญาตให้เข้าสู่ระบบ: ${message}`;
}

async function signInWithRetry(
  supabase: Awaited<ReturnType<typeof createClient>>,
  email: string,
  password: string,
) {
  const credentials = { email, password };
  const firstAttempt = await supabase.auth.signInWithPassword(credentials);

  if (firstAttempt.error?.name !== "AuthRetryableFetchError") {
    return firstAttempt;
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return supabase.auth.signInWithPassword(credentials);
}

export async function signInAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "กรุณากรอกอีเมลและรหัสผ่าน" };
  }

  const supabase = await createClient();
  const { data, error } = await signInWithRetry(supabase, email, password);

  if (error) {
    console.error("Supabase sign-in failed", {
      name: error.name,
      status: error.status,
      message: error.message,
    });
    return { error: getLoginErrorMessage(error.message) };
  }

  if (!data.session) {
    return { error: "เข้าสู่ระบบสำเร็จ แต่สร้าง session ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง" };
  }

  // The protected server layout performs the authoritative admin check.
  redirect("/admin");
}
