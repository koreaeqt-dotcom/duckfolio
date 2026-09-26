import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/supabase/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen flex-col md:flex-row">
        <AdminSidebar email={user.email} />

        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
