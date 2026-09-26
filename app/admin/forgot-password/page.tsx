import Link from "next/link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata = {
  title: "ขอเปลี่ยนรหัสผ่าน | Duckfolio",
};

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-md border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/30">
        <Link href="/admin/login" className="text-sm text-cyan-200 hover:text-cyan-100">
          กลับไปหน้าเข้าสู่ระบบ
        </Link>
        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
            กู้คืนบัญชี
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">ขอเปลี่ยนรหัสผ่าน</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            เราจะส่งลิงก์ตั้งรหัสผ่านใหม่ไปยังอีเมล Supabase Auth ของคุณ
          </p>
        </div>
        <ForgotPasswordForm />
      </section>
    </main>
  );
}
