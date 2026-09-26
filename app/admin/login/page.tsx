import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/app/admin/login/login-form";
import { getCurrentUser, isAdminUser } from "@/lib/supabase/auth";

export const metadata = {
  title: "เข้าสู่ระบบผู้ดูแล | Duckfolio",
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const isAdmin = await isAdminUser(user ? { id: user.id } : null);

  if (isAdmin) {
    redirect("/admin");
  }

  const sessionMissing = params.error === "session";
  const unauthorized = params.error === "unauthorized";
  const resetSuccess = params.reset === "success";

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-5 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-md border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-cyan-950/30">
        <Link href="/" className="text-sm text-cyan-200 hover:text-cyan-100">
          กลับไปหน้า Portfolio
        </Link>

        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
            พื้นที่จัดการ Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            เข้าสู่ระบบผู้ดูแล
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            ใช้บัญชี Supabase Auth ที่ได้รับสิทธิ์ในระบบแล้ว
          </p>
          <Link
            href="/admin/forgot-password"
            className="mt-3 inline-block text-sm text-cyan-200 hover:text-cyan-100"
          >
            ลืมรหัสผ่าน? ขออีเมลตั้งรหัสผ่านใหม่
          </Link>
        </div>

        {sessionMissing ? (
          <p className="mt-6 rounded-md border border-red-300/30 bg-red-300/10 px-4 py-3 text-sm text-red-100">
            เข้าสู่ระบบแล้วแต่ session ไม่ถูกส่งกลับมายังเว็บไซต์ กรุณาลองใหม่อีกครั้ง
          </p>
        ) : null}

        {unauthorized ? (
          <p className="mt-6 rounded-md border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
            บัญชีนี้เข้าสู่ระบบแล้ว แต่ยังไม่ได้รับสิทธิ์จัดการ Portfolio
          </p>
        ) : null}

        {resetSuccess ? (
          <p className="mt-6 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            เปลี่ยนรหัสผ่านสำเร็จแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่
          </p>
        ) : null}

        <LoginForm />
      </section>
    </main>
  );
}
