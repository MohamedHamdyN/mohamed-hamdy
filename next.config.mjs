/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: false,
  // إضافة تكوين لمعالجة مشكلة تحميل الأصول
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // تعطيل تحسين الصور لتجنب مشاكل التحميل
  experimental: {
    largePageDataBytes: 128 * 100000, // زيادة حجم البيانات المسموح به
  },
}

export default nextConfig
