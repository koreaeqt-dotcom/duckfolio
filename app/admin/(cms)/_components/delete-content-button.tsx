"use client";

import { deleteContent } from "@/app/admin/(cms)/content-actions";
import type { ContentTableKey } from "@/lib/admin/content-config";

type DeleteContentButtonProps = {
  id: string;
  tableKey: ContentTableKey;
};

export function DeleteContentButton({ id, tableKey }: DeleteContentButtonProps) {
  return (
    <form
      action={deleteContent.bind(null, tableKey, id)}
      onSubmit={(event) => {
        if (!confirm("ลบรายการนี้ใช่ไหม? การลบไม่สามารถย้อนกลับได้")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-red-300/30 px-3 py-2 text-sm text-red-100 hover:border-red-200"
      >
        ลบรายการ
      </button>
    </form>
  );
}
