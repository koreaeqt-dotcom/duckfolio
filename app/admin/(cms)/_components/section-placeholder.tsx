import Link from "next/link";

type SectionPlaceholderProps = {
  title: string;
  description: string;
};

export function SectionPlaceholder({
  title,
  description,
}: SectionPlaceholderProps) {
  return (
    <section className="mx-auto max-w-5xl">
      <Link href="/admin" className="text-sm text-cyan-200 hover:text-cyan-100">
        Back to dashboard
      </Link>
      <div className="mt-6 rounded-md border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
          Admin section
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">{description}</p>
      </div>
    </section>
  );
}
