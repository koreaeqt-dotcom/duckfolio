"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthRecoveryHandler() {
  const router = useRouter();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    if (hash.has("access_token") && hash.has("refresh_token")) {
      router.replace("/admin/reset-password");
      return;
    }

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        router.replace("/admin/reset-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
