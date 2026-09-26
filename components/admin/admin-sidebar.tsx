"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "ภาพรวม" },
  { href: "/admin/projects", label: "ผลงาน" },
  { href: "/admin/achievements", label: "ความสำเร็จ" },
  { href: "/admin/competitions", label: "รายการแข่งขัน" },
  { href: "/admin/certificates", label: "ใบรับรอง" },
  { href: "/admin/gallery", label: "แกลเลอรี" },
  { href: "/admin/skills", label: "ทักษะ" },
  { href: "/admin/timeline", label: "เส้นทาง" },
  { href: "/admin/profile", label: "โปรไฟล์" },
];

export function AdminSidebar({ email }: { email?: string | null }) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <aside className="border-b border-cyan-400/10 bg-slate-950/90 p-5 md:w-72 md:border-b-0 md:border-r">
      <Link href="/admin" className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-100/20 bg-cyan-300 text-lg font-black text-slate-950 shadow-[0_0_18px_rgba(125,211,252,0.16)]">
          D
        </span>
        <span>
          <span className="block text-lg font-semibold">Duckfolio</span>
          <span className="block text-sm text-slate-400">จัดการ Portfolio</span>
        </span>
      </Link>

      <nav className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-3 py-2 text-sm transition ${
              isActive(item.href)
                ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                : "text-slate-300 hover:bg-cyan-300/10 hover:text-cyan-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-5">
        <p className="break-words text-xs text-slate-500">
          {email ?? "เข้าสู่ระบบแล้ว"}
        </p>
        <form action={signOut} className="mt-3">
          <button
            type="submit"
            className="w-full rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
          >
            ออกจากระบบ
          </button>
        </form>
      </div>
    </aside>
  );
}
