"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsSending(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (resetError) {
      setError(
        resetError.message.toLowerCase().includes("rate limit exceeded")
          ? "ส่งอีเมลบ่อยเกินกำหนด กรุณารอสักครู่ แล้วใช้ลิงก์ reset ฉบับล่าสุดในอีเมลของคุณ"
          : "ส่งอีเมลไม่สำเร็จ กรุณาตรวจสอบ Auth logs ใน Supabase",
      );
      setIsSending(false);
      return;
    }

    setMessage("ส่งลิงก์แล้ว กรุณาเปิดอีเมลล่าสุดและกดลิงก์เพื่อตั้งรหัสผ่านใหม่");
    setIsSending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        อีเมล
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
          className="w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
          placeholder="koreaeqt@gmail.com"
        />
      </label>
      {message ? (
        <p className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSending}
        className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSending ? "กำลังส่ง..." : "ส่งลิงก์ตั้งรหัสผ่านใหม่"}
      </button>
      <Link href="/admin/reset-password" className="text-center text-sm text-cyan-200 hover:text-cyan-100">
        มีลิงก์ reset อยู่แล้ว ไปตั้งรหัสผ่าน
      </Link>
    </form>
  );
}
