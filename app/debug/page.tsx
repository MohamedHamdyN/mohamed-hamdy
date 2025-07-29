// pages/debug.tsx
import { supabase } from "@/lib/supabase"

export default async function DebugPage() {
  const { data: profile, error } = await supabase.from("profile").select("*").limit(1).single()

  return (
    <pre>{JSON.stringify({ profile, error }, null, 2)}</pre>
  )
}
