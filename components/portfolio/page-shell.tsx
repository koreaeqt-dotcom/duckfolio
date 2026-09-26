import type { ReactNode } from "react";
import { SiteNav } from "@/components/portfolio/site-nav";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="space-shell min-h-screen text-slate-100">
      <SiteNav />
      {children}
      <footer className="border-t border-white/10 bg-[#02050a] px-5 py-7">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-sm text-slate-500">
          <span>Somprasong Thunnok</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
