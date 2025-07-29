"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DebugProd() {
  const [res, setRes] = useState<any>()

  useEffect(() => {
    supabase.from("profile").select("*").then((r) => {
      console.log("DebugProd:", r)
      setRes(r.data)
    })
  }, [])

  return <pre>{JSON.stringify(res, null, 2)}</pre>
}
