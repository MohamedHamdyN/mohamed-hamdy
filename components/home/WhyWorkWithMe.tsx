"use client"
import InfiniteSlider from "@/components/shared/InfiniteSlider"

// Hardcoded reasons data
const reasons = [
  {
    id: 1,
    title: "Strategic Data Insights",
    description: "Turning raw data into meaningful financial and business strategies",
    icon: "BarChart3",
    color: "text-yellow-500",
    enabled: true,
  },
  {
    id: 2,
    title: "Advanced Technical Skills",
    description: "Expertise in Python, SQL, Power BI, and financial analytics",
    icon: "Cpu",
    color: "text-blue-500",
    enabled: true,
  },
  {
    id: 3,
    title: "Analytical Problem Solver",
    description: "Applying logic and data-driven approaches to complex challenges",
    icon: "BrainCircuit",
    color: "text-green-500",
    enabled: true,
  },
  {
    id: 4,
    title: "Effective Data Storytelling",
    description: "Communicating insights clearly through compelling visualizations",
    icon: "Presentation",
    color: "text-purple-500",
    enabled: true,
  },
]

export default function WhyWorkWithMe() {
  // Hardcoded translations
  const translations = {
    whyWorkWithMe: {
      title: "Why Work With Me",
      description: "Benefits of collaborating with a dedicated data analyst",
    },
  }

  // Filter enabled reasons
  const enabledReasons = reasons.filter((reason) => reason.enabled !== false)

  return (
    <InfiniteSlider
      items={enabledReasons}
      title={translations.whyWorkWithMe.title || "Why Work With Me"}
      description={translations.whyWorkWithMe.description || "Benefits of collaborating with a dedicated data analyst"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={true}
    />
  )
}
