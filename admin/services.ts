export interface Service {
  id: number
  title: string
  description: string
  icon: string
  color: string
  features: string[]
  enabled: boolean
}

export const services: Service[] = [
  {
    id: 1,
    title: "Data Analysis",
    description: "Comprehensive analysis of your data to extract valuable insights",
    icon: "BarChart2",
    color: "bg-blue-500",
    features: [
      "Exploratory data analysis",
      "Pattern recognition",
      "Trend identification",
      "Anomaly detection",
      "Correlation analysis",
    ],
    enabled: true,
  },
  {
    id: 2,
    title: "Data Visualization",
    description: "Transform complex data into clear, compelling visual stories",
    icon: "PieChart",
    color: "bg-purple-500",
    features: [
      "Interactive dashboards",
      "Custom charts and graphs",
      "Infographics",
      "Real-time data visualization",
      "Executive reports",
    ],
    enabled: true,
  },
  {
    id: 3,
    title: "Predictive Analytics",
    description: "Forecast future trends and outcomes using advanced statistical models",
    icon: "TrendingUp",
    color: "bg-green-500",
    features: [
      "Forecasting models",
      "Risk assessment",
      "Market trend prediction",
      "Customer behavior prediction",
      "Scenario analysis",
    ],
    enabled: false,
  },
  {
    id: 4,
    title: "Business Intelligence",
    description: "Transform raw data into actionable business insights",
    icon: "Activity",
    color: "bg-yellow-500",
    features: [
      "KPI development and tracking",
      "Performance analytics",
      "Competitive analysis",
      "Market research",
      "Strategic recommendations",
    ],
    enabled: true,
  },
  {
    id: 5,
    title: "Data Cleaning & Preparation",
    description: "Ensure your data is accurate, consistent, and ready for analysis",
    icon: "Filter",
    color: "bg-red-500",
    features: [
      "Data cleaning and validation",
      "Missing data imputation",
      "Data transformation",
      "Feature engineering",
      "Dataset integration",
    ],
    enabled: false,
  },
  {
    id: 6,
    title: "Machine Learning Solutions",
    description: "Custom machine learning models to solve complex business problems",
    icon: "Brain",
    color: "bg-cyan-500",
    features: [
      "Classification models",
      "Regression models",
      "Clustering algorithms",
      "Natural language processing",
      "Computer vision solutions",
    ],
    enabled: true,
  },
]

export const paymentMethods = [
  {
    name: "Instapay",
    icon: "CreditCard",
  },
  {
    name: "Bank Transfer",
    icon: "Building",
  },
  {
    name: "Cryptocurrency",
    icon: "Bitcoin",
  },
]

// منصات العمل الحر - تحديث روابط الشعارات
export interface FreelancePlatform {
  name: string
  profileUrl: string
  logo: string
  color: string
  enabled: boolean
}

export const freelancePlatforms: FreelancePlatform[] = [
  {
    name: "Upwork",
    profileUrl: "https://www.upwork.com/freelancers/~01b209a44bb4f07b39",
    logo: "https://i.imgur.com/zziw256.png", // تحديث رابط الشعار
    color: "border-green-500",
    enabled: true,
  },
  {
    name: "Freelancer",
    profileUrl: "https://www.freelancer.com/u/yourusername",
    logo: "https://i.imgur.com/zziw256.png",
    color: "border-blue-500",
    enabled: true,
  },
  {
    name: "Mostql",
    profileUrl: "https://mostaql.com/u/yourusername",
    logo: "https://i.imgur.com/zziw256.png",
    color: "border-yellow-500",
    enabled: true,
  },
]
