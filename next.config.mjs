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
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  trailingSlash: false,
  optimizeFonts: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // إضافة خيارات لتجنب أخطاء JavaScript
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [],
  },
  // تحسين تحميل الملفات
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
}

export default nextConfig
