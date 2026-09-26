import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCount(table: string, filter?: { column: string; value: boolean }) {
  const supabase = await createClient();
  let query = supabase.from(table).select("*", { count: "exact", head: true });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;

  return {
    count: error ? null : count ?? 0,
    error: error?.message,
  };
}

async function getRecentProjects() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id,title,published,featured,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    projects: data ?? [],
    error: error?.message,
  };
}

export default async function AdminDashboardPage() {
  const [
    totalProjects,
    publishedProjects,
    achievements,
    competitions,
    certificates,
    gallery,
    recentProjects,
  ] = await Promise.all([
    getCount("projects"),
    getCount("projects", { column: "published", value: true }),
    getCount("achievements"),
    getCount("competitions"),
    getCount("certificates"),
    getCount("gallery"),
    getRecentProjects(),
  ]);

  const stats = [
    { label: "ผลงานทั้งหมด", value: totalProjects.count },
    { label: "ผลงานที่เผยแพร่", value: publishedProjects.count },
    { label: "ความสำเร็จ", value: achievements.count },
    { label: "รายการแข่งขัน", value: competitions.count },
    { label: "ใบรับรอง", value: certificates.count },
    { label: "ภาพในแกลเลอรี", value: gallery.count },
  ];

  const hasDashboardError =
    stats.some((stat) => stat.value === null) || Boolean(recentProjects.error);

  return (
    <section className="mx-auto max-w-6xl">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
          พื้นที่จัดการ
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">ภาพรวม Portfolio</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          ดูสถานะข้อมูลทั้งหมด และเข้าไปเพิ่มหรือแก้ไขเนื้อหาได้จากที่นี่
        </p>
      </div>

      {hasDashboardError ? (
        <p className="mt-6 rounded-md border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
          โหลดข้อมูลบางส่วนไม่ได้ ตรวจสอบว่า RLS และสิทธิ์ของบัญชีผู้ดูแลถูกตั้งค่าแล้ว
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-md border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {stat.value ?? "--"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold text-white">ผลงานล่าสุด</h2>
          <div className="mt-5 grid gap-3">
            {recentProjects.projects.length > 0 ? (
              recentProjects.projects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between gap-3 rounded-md border border-white/10 px-4 py-3 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-medium text-white">{project.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {project.featured ? "แนะนำ" : "ทั่วไป"} ·{" "}
                      {project.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                    </p>
                  </div>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-sm font-medium text-cyan-200 hover:text-cyan-100"
                  >
                    แก้ไข
                  </Link>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
                ยังไม่มีผลงาน
              </p>
            )}
          </div>
        </div>

        <div className="rounded-md border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
          <h2 className="text-lg font-semibold text-white">ทางลัด</h2>
          <div className="mt-5 grid gap-3">
            {[
              { href: "/admin/projects/new", label: "เพิ่มผลงาน" },
              { href: "/admin/achievements", label: "เพิ่มความสำเร็จ" },
              { href: "/admin/competitions", label: "เพิ่มรายการแข่งขัน" },
              { href: "/admin/gallery", label: "เพิ่มรูปภาพ" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-md bg-cyan-300 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
