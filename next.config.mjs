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
  
  // إضافة إعدادات webpack لإصلاح خطأ "Unexpected token '<'"
  webpack: (config) => {
    // إضافة معالجة ملفات SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    // إضافة معالجة ملفات الوسائط
    config.module.rules.push({
      test: /\.(mp3|wav|ogg|mp4|webm|glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/media/',
          outputPath: 'static/media/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    
    return config;
  },
}

export default nextConfig
