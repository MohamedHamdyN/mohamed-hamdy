export interface Client {
  id: number
  name: string
  logo: string
  testimonial?: string
  rating: number
  website?: string
  lastProject?: string
  enabled?: boolean
}

export const clients: Client[] = [
  {
    id: 1,
    name: "NovaTech Solutions",
    logo: "https://i.imgur.com/zziw256.png",
    testimonial:
      "The data analysis provided crucial insights that helped us refine our digital transformation strategy.",
    rating: 5,
    website: "https://novatech-solutions.com",
    lastProject: "https://example.com/novatech-project",
    enabled: true,
  },
  {
    id: 2,
    name: "Skyline Finance",
    logo: "https://i.imgur.com/zziw256.png",
    testimonial: "The financial forecasting models helped us optimize our risk management and investment planning.",
    rating: 5,
    website: "https://skyline-finance.com",
    lastProject: "https://example.com/skyline-project",
    enabled: true,
  },
  {
    id: 3,
    name: "SwiftRetail",
    logo: "https://i.imgur.com/zziw256.png",
    testimonial: "The customer segmentation analysis significantly improved our targeted marketing campaigns.",
    rating: 4,
    website: "https://swift-retail.com",
    enabled: true,
  },
  {
    id: 4,
    name: "MediCare Innovations",
    logo: "https://i.imgur.com/zziw256.png",
    testimonial: "Predictive analytics enabled us to enhance patient care and optimize resource allocation.",
    rating: 5,
    website: "",
    lastProject: "https://example.com/medicare-project",
    enabled: true,
  },
  {
    id: 5,
    name: "BrightLearn Academy",
    logo: "https://i.imgur.com/zziw256.png",
    testimonial: "The learning analytics provided valuable insights that improved student engagement and performance.",
    rating: 4,
    website: "https://brightlearn-academy.com",
    enabled: true,
  },
]
