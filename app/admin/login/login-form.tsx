"use client";

import { useActionState } from "react";
import { signInAction, type LoginState } from "@/app/admin/login/actions";

export function LoginForm() {
  const initialState: LoginState = { error: "" };
  const [state, formAction, isLoading] = useActionState(
    signInAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 grid gap-5">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          อีเมล
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
          placeholder="อีเมลของคุณ"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-200"
        >
          รหัสผ่าน
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
          placeholder="รหัสผ่าน"
        />
      </div>

      {state.error ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
