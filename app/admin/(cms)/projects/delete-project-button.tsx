"use client";

import { deleteProject } from "@/app/admin/(cms)/projects/actions";

type DeleteProjectButtonProps = {
  projectId: string;
};

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  return (
    <form
      action={deleteProject.bind(null, projectId)}
      onSubmit={(event) => {
        if (!confirm("ลบผลงานนี้ใช่ไหม? การลบไม่สามารถย้อนกลับได้")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="text-sm font-medium text-red-200 hover:text-red-100"
      >
        ลบผลงาน
      </button>
    </form>
  );
}
