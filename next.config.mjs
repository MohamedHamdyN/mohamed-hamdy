/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuraciones básicas
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuraciones experimentales mínimas
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Ignorar errores durante la compilación
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración de imágenes
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ibb.co' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'i.postimg.cc' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'postimg.cc' },
      { protocol: 'https', hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.example.com' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configuración de compresión
  compress: true,
  
  // Headers optimizados para permitir Speed Insights
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-scripts.com *.vercel-insights.com; connect-src 'self' *.vercel-insights.com vitals.vercel-insights.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';"
          }
        ]
      },
      {
        source: '/_vercel/speed-insights/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  
  // Desactivar cabecera "Powered-By"
  poweredByHeader: false,
}

export default nextConfig
