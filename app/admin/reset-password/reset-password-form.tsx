"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (password !== confirmation) {
      setError("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setIsSaving(false);
      return;
    }

    await supabase.auth.signOut();
    window.location.href = new URL("/admin/login?reset=success", window.location.origin).toString();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        รหัสผ่านใหม่
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          required
          className="w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        ยืนยันรหัสผ่านใหม่
        <input
          type="password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          autoComplete="new-password"
          required
          className="w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
        />
      </label>
      {error ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSaving}
        className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSaving ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
      </button>
    </form>
  );
}
