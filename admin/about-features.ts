export interface AboutFeature {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

export const aboutFeatures: AboutFeature[] = [
  {
    id: 1,
    title: "Data-Driven Approach",
    description: "I base all my decisions and strategies on thorough data analysis",
    icon: "Database",
    color: "text-blue-500",
  },
  {
    id: 2,
    title: "Financial Expertise",
    description: "Deep understanding of financial metrics and business KPIs",
    icon: "DollarSign",
    color: "text-green-500",
  },
  {
    id: 3,
    title: "Visualization Skills",
    description: "Transform complex data into clear, insightful visualizations",
    icon: "BarChart",
    color: "text-purple-500",
  },
  {
    id: 4,
    title: "Problem Solver",
    description: "Identify patterns and solve business problems through analytics",
    icon: "PuzzlePiece",
    color: "text-yellow-500",
  },
  {
    id: 5,
    title: "Continuous Learning",
    description: "Always expanding my knowledge of data tools and techniques",
    icon: "GraduationCap",
    color: "text-cyan-500",
  },
  {
    id: 6,
    title: "Effective Communication",
    description: "Clearly explain technical findings to non-technical stakeholders",
    icon: "MessageSquare",
    color: "text-red-500",
  },
]
