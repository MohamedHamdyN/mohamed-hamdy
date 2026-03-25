import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ServicesGrid from "@/components/services/ServicesGrid"
import ContactCTA from "@/components/shared/ContactCTA"
import PageHero from "@/components/shared/PageHero"
import { Briefcase, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export default function ServicesPage() {
  // If services page is disabled, return 404
  if (!toggleSettings.services_page) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="Services"
        description="Comprehensive data analysis and financial consulting solutions"
        icon={<Briefcase className="h-4 w-4" />}
      />

      {/* Services Section */}
      <ServicesGrid />

      {/* Why Choose Me Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Work With Me</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I combine technical expertise with business acumen to deliver results that matter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Expert Analysis", desc: "Deep insights from complex financial data" },
              { title: "Custom Solutions", desc: "Tailored approaches for your unique needs" },
              { title: "Fast Turnaround", desc: "Efficient delivery without compromising quality" },
              { title: "Clear Communication", desc: "Easy-to-understand reports and recommendations" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-primary mt-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
