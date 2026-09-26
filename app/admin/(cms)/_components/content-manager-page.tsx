import { ContentForm } from "@/app/admin/(cms)/_components/content-form";
import { DeleteContentButton } from "@/app/admin/(cms)/_components/delete-content-button";
import type { ContentConfig } from "@/lib/admin/content-config";
import { createClient } from "@/lib/supabase/server";

type ContentRow = Record<string, unknown> & { id?: string; title?: string; name?: string };

function titleFor(item: ContentRow, fallback: string) {
  return item.title ?? item.name ?? fallback;
}

export async function ContentManagerPage({ config }: { config: ContentConfig }) {
  const supabase = await createClient();
  const query = supabase.from(config.table).select("*");
  const { data, error } = config.singleton
    ? await query.limit(1)
    : await query.order("sort_order", { ascending: true });
  const items = (data ?? []) as ContentRow[];
  const singletonItem = config.singleton ? items[0] : null;

  return (
    <section className="mx-auto max-w-6xl">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-200">
          CMS
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{config.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">{config.description}</p>
      </div>

      {error ? (
        <p className="mt-6 rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error.message}
        </p>
      ) : null}

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-white">
          {config.singleton ? "แก้ไขโปรไฟล์" : "เพิ่มรายการใหม่"}
        </h2>
        <ContentForm config={config} item={singletonItem} />
      </div>

      {!config.singleton ? (
        <div className="mt-10 grid gap-4">
          <h2 className="text-lg font-semibold text-white">รายการที่มีอยู่</h2>
          {items.length > 0 ? (
            items.map((item, index) => (
              <details
                key={item.id ?? index}
                className="rounded-md border border-white/10 bg-white/[0.03] p-5"
              >
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {titleFor(item, `รายการที่ ${index + 1}`)}
                </summary>
                <div className="mt-5 grid gap-4">
                  <ContentForm config={config} item={item} compact />
                  {item.id ? (
                    <DeleteContentButton id={item.id} tableKey={config.key} />
                  ) : null}
                </div>
              </details>
            ))
          ) : (
            <p className="rounded-md border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
              ยังไม่มีข้อมูล กดเพิ่มรายการใหม่ด้านบนได้เลย
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
