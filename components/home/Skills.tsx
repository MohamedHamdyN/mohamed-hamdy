"use client"
import InfiniteSlider from "@/components/shared/InfiniteSlider"

// Hardcoded skills data
const skills = [
  {
    id: 1,
    name: "Financial Data Analysis",
    description: "Analyzing financial statements and business data",
    icon: "BarChart2",
    color: "text-blue-500",
    enabled: true,
  },
  {
    id: 2,
    name: "Data Visualization",
    description: "Creating insightful financial dashboards",
    icon: "PieChart",
    color: "text-purple-500",
    enabled: true,
  },
  {
    id: 3,
    name: "Accounting Analytics",
    description: "Applying analytics to financial reporting and auditing",
    icon: "FileText",
    color: "text-green-500",
    enabled: true,
  },
  {
    id: 4,
    name: "Statistical Analysis",
    description: "Using statistical methods for financial forecasting",
    icon: "LineChart",
    color: "text-yellow-500",
    enabled: true,
  },
  {
    id: 5,
    name: "SQL for Finance",
    description: "Querying financial databases for insights",
    icon: "Database",
    color: "text-red-500",
    enabled: true,
  },
]

export default function Skills() {
  // Hardcoded translations
  const translations = {
    skills: {
      title: "My Skills",
      description: "Specialized expertise in data analysis and financial accounting",
    },
  }

  // Filter enabled skills
  const enabledSkills = skills.filter((skill) => skill.enabled !== false)

  return (
    <InfiniteSlider
      items={enabledSkills}
      title={translations.skills.title || "My Skills"}
      description={translations.skills.description || "Specialized expertise in data analysis"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}
