// components/maintenance/MaintenanceScreen.tsx
import { getProfile, getSocialLinks } from "@/app/actions/cms"
import SocialLinksBar from "./SocialLinksBar"

function asString(v: unknown) {
  return typeof v === "string" ? v : ""
}

export default async function MaintenanceScreen() {
  const [profile, socials] = await Promise.all([getProfile(), getSocialLinks()])

  const name = asString(profile?.name) || "Portfolio"
  const title1 = asString(profile?.short_title) || asString(profile?.title) || "Data Analyst"
  const hero = asString(profile?.hero_description) || "Transforming complex data into actionable insights."

  const enabledSocials = (socials ?? []).filter((x: any) => x?.enabled && x?.url)

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40 w-full">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <p className="text-base font-semibold leading-7 text-primary">Hello, I&apos;m</p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary">
              {name}
            </span>
          </h1>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl text-primary">
            {title1}
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {hero}
          </p>

          {/* بدل الأزرار: Social Icons */}
          <div className="mt-10">
            <SocialLinksBar items={enabledSocials} />
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Maintenance mode is enabled.
          </p>
        </div>

        {/* يمين الشاشة: نفس كروت الديكور */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
              <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

              {/* Cards placeholders */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute top-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                    <div className="h-8 w-8 bg-primary/30 rounded mb-2" />
                    <div className="w-32 h-2 bg-primary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-primary/20 rounded-full mt-2"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                    <div className="h-8 w-8 bg-secondary/30 rounded mb-2" />
                    <div className="w-32 h-2 bg-secondary/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-secondary/20 rounded-full mt-2"></div>
                  </div>

                  <div className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-background/80 border border-border p-4 rounded-lg shadow-lg backdrop-blur-sm">
                    <div className="h-8 w-8 bg-accent/30 rounded mb-2" />
                    <div className="w-32 h-2 bg-accent/30 rounded-full"></div>
                    <div className="w-24 h-2 bg-accent/20 rounded-full mt-2"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}