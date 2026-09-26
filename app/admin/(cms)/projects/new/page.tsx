import { ProjectForm } from "@/app/admin/(cms)/projects/project-form";

export default function AdminNewProjectPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
          ผลงาน
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">เพิ่มผลงานใหม่</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          ใส่เรื่องราว ลิงก์ ช่วงเวลา และรูปภาพของผลงานที่อยากเล่า
        </p>
      </div>
      <ProjectForm />
    </section>
  );
}
