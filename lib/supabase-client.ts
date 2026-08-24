import { createClient } from "@supabase/supabase-js";

// Uses Supabase's new "publishable" key (replaces the old "anon" key) — safe to expose
// in the browser. RLS policies (see supabase/schema.sql) restrict what this key can
// actually do: insert new mandals (as pending) and read only approved ones.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
