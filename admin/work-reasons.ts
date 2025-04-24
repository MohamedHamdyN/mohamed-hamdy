export interface Reason {
  id: number
  title: string
  description: string
  icon: string
  color: string
  enabled?: boolean
}

export const reasons: Reason[] = [
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
  {
    id: 5,
    title: "Impact-Driven Mindset",
    description: "Focused on delivering data-backed solutions with real business value",
    icon: "TrendingUp",
    color: "text-red-500",
    enabled: true,
  },
  {
    id: 6,
    title: "Lifelong Learner",
    description: "Continuously evolving with the latest trends in data and finance",
    icon: "GraduationCap",
    color: "text-cyan-500",
    enabled: true,
  },
]
