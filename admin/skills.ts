export interface Skill {
  id: number
  name: string
  description: string
  icon: string
  color: string
  enabled?: boolean
}

export const skills: Skill[] = [
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
  {
    id: 6,
    name: "Python for Accounting",
    description: "Automating financial analysis and reporting",
    icon: "Code",
    color: "text-cyan-500",
    enabled: true,
  },
  {
    id: 7,
    name: "Power BI",
    description: "Building interactive financial dashboards",
    icon: "TrendingUp",
    color: "text-orange-500",
    enabled: true,
  },
  {
    id: 8,
    name: "Cost and Budget Analysis",
    description: "Analyzing budgets and cost structures",
    icon: "DollarSign",
    color: "text-indigo-500",
    enabled: true,
  },
  {
    id: 9,
    name: "Financial Forecasting",
    description: "Predicting financial trends using data models",
    icon: "Activity",
    color: "text-teal-500",
    enabled: true,
  },
  {
    id: 10,
    name: "Risk Analysis",
    description: "Assessing financial risks through data analytics",
    icon: "Shield",
    color: "text-gray-500",
    enabled: true,
  },
]
