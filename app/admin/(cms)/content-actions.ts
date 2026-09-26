"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import {
  contentConfigs,
  type ContentTableKey,
  type ContentField,
} from "@/lib/admin/content-config";

function nullableText(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function fieldValue(field: ContentField, formData: FormData) {
  if (field.type === "checkbox") {
    return formData.get(field.name) === "on";
  }

  if (field.type === "number") {
    const value = nullableText(formData, field.name);
    return value ? Number(value) : 0;
  }

  return nullableText(formData, field.name);
}

export async function saveContent(tableKey: ContentTableKey, formData: FormData) {
  await requireAdmin();

  const config = contentConfigs[tableKey];
  const id = nullableText(formData, "id");
  const payload = Object.fromEntries(
    config.fields.map((field) => [field.name, fieldValue(field, formData)]),
  );

  const missingRequiredField = config.fields.find(
    (field) => field.required && !payload[field.name],
  );

  if (missingRequiredField) {
    throw new Error(`${missingRequiredField.label} is required.`);
  }

  const supabase = await createClient();

  if (id) {
    const { error } = await supabase
      .from(config.table)
      .update(payload)
      .eq("id", id);

    if (error) {
      throw new Error(`บันทึกข้อมูลไม่สำเร็จ: ${error.message}`);
    }
  } else {
    const { error } = await supabase.from(config.table).insert(payload);

    if (error) {
      throw new Error(`เพิ่มข้อมูลไม่สำเร็จ: ${error.message}`);
    }
  }

  revalidatePath(`/admin/${tableKey}`);
  revalidatePath("/");
}

export async function deleteContent(tableKey: ContentTableKey, id: string) {
  await requireAdmin();

  const config = contentConfigs[tableKey];
  const supabase = await createClient();
  const { error } = await supabase.from(config.table).delete().eq("id", id);

  if (error) {
    throw new Error(`ลบข้อมูลไม่สำเร็จ: ${error.message}`);
  }

  revalidatePath(`/admin/${tableKey}`);
  revalidatePath("/");
}
