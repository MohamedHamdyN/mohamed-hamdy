// Definición de categorías de proyectos
export const projectCategories = {
  1: "dataVisualization",
  2: "machineLeaning",
  3: "businessIntelligence",
  4: "statisticalAnalysis",
  5: "dataEngineering",
}

// Nombres de categorías para mostrar
export const projectCategoriesName = {
  1: "Data Visualization",
  2: "Machine Learning",
  3: "Business Intelligence",
  4: "Statistical Analysis",
  5: "Data Engineering",
}

export type ProjectCategory = keyof typeof projectCategories | string

export interface Project {
  id: number
  title: string
  description: string
  shortDescription: string
  categoryId: number // Ahora usamos ID de categoría
  image: string
  projectUrl?: string
  linkedinUrl?: string
  technologies: string[]
  date: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Sales Dashboard",
    shortDescription: "Interactive dashboard analyzing sales trends",
    description:
      "Developed an interactive dashboard using Power BI to analyze e-commerce sales trends, customer behavior, and product performance. The dashboard provides actionable insights that helped increase revenue by 15% and optimize marketing strategies.",
    categoryId: 1, // dataVisualization
    image: "https://imgur.com/BJcBweu.png",
    projectUrl: "https://example.com/project1",
    linkedinUrl: "https://linkedin.com/in/mohamed-hamdy/project1",
    technologies: ["Power BI", "SQL", "Excel", "DAX"],
    date: "2023-05",
    featured: true,
  },
  {
    id: 2,
    title: "Customer Churn Prediction Model",
    shortDescription: "ML model to predict customer churn",
    description:
      "Built a machine learning model to predict customer churn for a telecommunications company. The model achieved 87% accuracy and helped the company implement targeted retention strategies, reducing churn rate by 23%.",
    categoryId: 2, // machineLeaning
    image: "",
    projectUrl: "",
    linkedinUrl: "",
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "Matplotlib"],
    date: "2023-03",
    featured: true,
  },
  {
    id: 3,
    title: "Financial Performance Analysis",
    shortDescription: "Comprehensive financial data analysis",
    description:
      "Conducted a comprehensive analysis of financial data for a multinational corporation. Identified key trends, anomalies, and opportunities for cost reduction, resulting in savings of over $500,000 annually.",
    categoryId: 3, // businessIntelligence
    image: "",
    projectUrl: "",
    linkedinUrl: "https://linkedin.com/in/mohamed-hamdy/project3",
    technologies: ["Tableau", "Excel", "SQL", "R"],
    date: "2023-01",
    featured: true,
  },
  {
    id: 4,
    title: "Market Research Statistical Analysis",
    shortDescription: "Statistical analysis of market research data",
    description:
      "Performed statistical analysis on market research data to identify consumer preferences and market trends. The insights guided product development and marketing strategies, contributing to a 20% increase in market share.",
    categoryId: 4, // statisticalAnalysis
    image: "",
    projectUrl: "https://example.com/project4",
    linkedinUrl: "",
    technologies: ["R", "SPSS", "Python", "Pandas", "NumPy"],
    date: "2022-11",
    featured: true,
  },
]
