export const dynamic = "force-dynamic"

import Hero from "@/components/home/Hero"
import Skills from "@/components/home/Skills"
import { getSettings } from "@/lib/settings"

export default async function Home() {
  const settings = await getSettings()

  return (
    <>
      <Hero />

      {/* عرض الإعدادات للتأكد أنها تُجلب */}
      <section className="bg-muted p-4">
        <h2 className="text-xl font-bold mb-2">Settings JSON:</h2>
        <pre className="text-sm bg-background p-2 rounded overflow-x-auto">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </section>

      {/* عرض Skills مباشرة بدون أي Lazy أو Suspense */}
      {settings.skills && (
        <section className="py-10">
          <Skills />
        </section>
      )}
    </>
  )
}
