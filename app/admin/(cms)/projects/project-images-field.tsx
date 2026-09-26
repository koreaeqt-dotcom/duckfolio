"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/image-upload";
import type { ProjectImage } from "@/types/project";

type ProjectImagesFieldProps = {
  images?: ProjectImage[];
  pathPrefix: string;
};

export function ProjectImagesField({
  images = [],
  pathPrefix,
}: ProjectImagesFieldProps) {
  const [items, setItems] = useState(
    images.length > 0
      ? images.map((image) => ({
          key: image.id,
          url: image.image_url ?? "",
          caption: image.caption ?? "",
        }))
      : [{ key: crypto.randomUUID(), url: "", caption: "" }],
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-slate-200">
          ภาพเพิ่มเติมของผลงาน
        </label>
        <button
          type="button"
          onClick={() =>
            setItems((current) => [
              ...current,
              { key: crypto.randomUUID(), url: "", caption: "" },
            ])
          }
          className="rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-cyan-300/40"
        >
          เพิ่มภาพ
        </button>
      </div>

      <div className="mt-3 grid gap-4">
        {items.map((item, index) => (
          <div
            key={item.key}
            className="rounded-md border border-white/10 bg-white/[0.03] p-4"
          >
            <ImageUpload
              label={`ภาพที่ ${index + 1}`}
              name="project_image_url"
              initialUrl={item.url}
              pathPrefix={`${pathPrefix}/gallery`}
            />
            <label className="mt-3 block text-sm font-medium text-slate-200">
              คำบรรยายภาพ
            </label>
            <input
              name="project_image_caption"
              defaultValue={item.caption}
              className="mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
