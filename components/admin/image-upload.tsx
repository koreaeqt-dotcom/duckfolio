"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type ImageUploadProps = {
  bucket?: string;
  initialUrl?: string | null;
  label: string;
  name: string;
  pathPrefix: string;
};

function cleanFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
}

export function ImageUpload({
  bucket = "portfolio-images",
  initialUrl,
  label,
  name,
  pathPrefix,
}: ImageUploadProps) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      event.target.value = "";
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 8 MB");
      event.target.value = "";
      return;
    }

    setError("");
    setIsUploading(true);

    const supabase = createClient();
    const path = `${pathPrefix}/${crypto.randomUUID()}-${cleanFilename(file.name)}`;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setError(uploadError.message);
      setIsUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    setUrl(data.publicUrl);
    setIsUploading(false);
  }

  return (
    <div>
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <div className="mt-2 grid gap-3 rounded-md border border-white/10 bg-slate-900/70 p-3">
        {url ? (
          <Image
            src={url}
            alt=""
            width={720}
            height={360}
            className="h-40 w-full rounded-md object-cover"
            unoptimized
          />
        ) : null}
        <input type="hidden" name={name} value={url} />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-300 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
        />
        {isUploading ? (
          <p className="text-sm text-cyan-100">กำลังอัปโหลดรูปภาพ...</p>
        ) : null}
        {error ? <p className="text-sm text-red-200">{error}</p> : null}
      </div>
    </div>
  );
}
