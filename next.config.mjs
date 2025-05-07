/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات أساسية
  reactStrictMode: true,
  swcMinify: true,
  
  // تجاهل أخطاء ESLint و TypeScript أثناء البناء
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // إعدادات الصور
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
  
  // تعطيل رأس "Powered-By"
  poweredByHeader: false,
  
  // تعطيل تحسين الخطوط
  optimizeFonts: false,
}

export default nextConfig
