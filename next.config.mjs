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
  // تحسين تحميل الأصول
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // تأكد من عدم وجود شرطات زائدة في النهاية
  trailingSlash: false,
  // إضافة خيار لتجنب أخطاء JavaScript
  optimizeFonts: false,
  swcMinify: true,
  compiler: {
    // تجنب أخطاء في تحويل JSX
    styledComponents: true,
  }
}

export default nextConfig
