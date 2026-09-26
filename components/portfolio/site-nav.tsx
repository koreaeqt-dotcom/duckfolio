import Link from "next/link";
import { DuckInsignia } from "@/components/portfolio/visual-system";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <nav className="glass-nav mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <DuckInsignia className="h-10 w-10 shrink-0" />
          <span className="truncate text-sm font-semibold text-white sm:text-base">Somprasong Thunnok</span>
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 border border-cyan-300/50 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
        >
          ดูผลงาน <span aria-hidden="true">-&gt;</span>
        </Link>
      </nav>
    </header>
  );
}
