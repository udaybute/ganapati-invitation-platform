import "server-only";
import { createClient } from "@supabase/supabase-js";

// SECRET key (replaces the old "service_role" key) — full database access, bypasses RLS.
// This file has the "server-only" guard so it can NEVER be imported into
// a client component by mistake (build will fail if you try).
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);
