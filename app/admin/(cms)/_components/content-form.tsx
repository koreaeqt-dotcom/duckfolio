import { saveContent } from "@/app/admin/(cms)/content-actions";
import { ImageUpload } from "@/components/admin/image-upload";
import type { ContentConfig, ContentField } from "@/lib/admin/content-config";

type ContentRow = Record<string, unknown>;

type ContentFormProps = {
  config: ContentConfig;
  item?: ContentRow | null;
  compact?: boolean;
};

const inputClass =
  "mt-2 w-full rounded-md border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300";

function valueFor(item: ContentRow | null | undefined, name: string) {
  const value = item?.[name];

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return "";
}

function fieldInput(config: ContentConfig, field: ContentField, item?: ContentRow | null) {
  const id = valueFor(item, "id") || "new";
  const value = valueFor(item, field.name);

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        rows={
          ["bio", "description", "takeaways"].includes(field.name) ? 5 : 3
        }
        defaultValue={value}
        className={inputClass}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <input
        type="checkbox"
        name={field.name}
        defaultChecked={Boolean(item?.[field.name])}
        className="mt-3 h-4 w-4 accent-cyan-300"
      />
    );
  }

  if (field.type === "image") {
    return (
      <ImageUpload
        label={field.label}
        name={field.name}
        initialUrl={value}
        pathPrefix={`${config.imagePath}/${id}`}
      />
    );
  }

  return (
    <input
      type={field.type === "url" ? "url" : field.type}
      name={field.name}
      required={field.required}
      defaultValue={value}
      className={inputClass}
    />
  );
}

export function ContentForm({ config, item, compact = false }: ContentFormProps) {
  return (
    <form
      action={saveContent.bind(null, config.key)}
      className={`grid gap-5 ${compact ? "" : "rounded-md border border-white/10 bg-white/[0.03] p-5"}`}
    >
      <input type="hidden" name="id" value={valueFor(item, "id")} />
      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((field) => {
          if (field.type === "image") {
            return (
              <div key={field.name} className="md:col-span-2">
                {fieldInput(config, field, item)}
              </div>
            );
          }

          return (
            <label
              key={field.name}
              className={field.type === "textarea" ? "md:col-span-2" : ""}
            >
              <span className="text-sm font-medium text-slate-200">
                {field.label}
              </span>
              {fieldInput(config, field, item)}
            </label>
          );
        })}
      </div>

      <button
        type="submit"
        className="rounded-md bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
      >
        บันทึกข้อมูล
      </button>
    </form>
  );
}
