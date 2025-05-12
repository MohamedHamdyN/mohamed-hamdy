/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuraciones básicas
  reactStrictMode: true,
  swcMinify: true,
  
  // Ignorar errores durante la compilación
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuración de imágenes
  images: {
    domains: [
      'i.imgur.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'ibb.co',
      'i.ibb.co',
      'i.postimg.cc',
      'imgur.com',
      'postimg.cc',
      'hebbkx1anhila5yf.public.blob.vercel-storage.com'
    ],
    unoptimized: true,
  },
  
  // Desactivar cabecera "Powered-By"
  poweredByHeader: false,
  
  // Desactivar optimización de fuentes
  optimizeFonts: false,
}

export default nextConfig
