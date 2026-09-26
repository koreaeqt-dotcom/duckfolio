import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AdminUser = {
  id: string;
};

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function isAdminUser(user: AdminUser | null) {
  if (!user) {
    return false;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Admin authorization query failed", error.message);
    return false;
  }

  return data?.user_id === user.id;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    console.warn("Admin route blocked: no authenticated Supabase session");
    redirect("/admin/login?error=session");
  }

  const isAdmin = await isAdminUser({ id: user.id });

  if (!isAdmin) {
    console.warn("Admin route blocked: authenticated user is not an admin");
    redirect("/admin/login?error=unauthorized");
  }

  return user;
}
