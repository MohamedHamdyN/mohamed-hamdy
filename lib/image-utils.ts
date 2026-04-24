// Image URL utility with fallback support
// إذا الصورة ما اشتغلت أو ما موجوده يرجع صورة افتراضيه من /public

const FALLBACK_IMAGES = {
  avatar: '/images/avatar.jpg',
  logo: '/images/logo.png',
  project: '/images/project-default.jpg',
  client: '/images/client-default.png',
}

/**
 * Get a safe image URL with fallback support
 * إذا الصورة موجوده يرجعها، إذا لا يرجع صورة افتراضيه
 */
export function getImageUrl(
  imageUrl?: string | null,
  type: 'avatar' | 'logo' | 'project' | 'client' = 'project'
): string {
  // إذا ما في صورة أو القيمة "00" ارجع الصورة الافتراضيه
  if (!imageUrl || imageUrl === '00') {
    return FALLBACK_IMAGES[type]
  }

  // إذا الصورة رابط كامل (تبدأ بـ http)، ارجعها مباشرة
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // إذا الصورة تبدأ بـ / أو ما فيها /، افترض إنها في /public
  if (!imageUrl.startsWith('/')) {
    return `/images/${imageUrl}`
  }

  return imageUrl
}

/**
 * Check if image exists (client-side validation)
 * استخدم دي عشان تتأكد إن الصورة موجوده قبل ما تعرضها
 */
export function onImageError(e: any, type: 'avatar' | 'logo' | 'project' | 'client' = 'project') {
  e.target.src = FALLBACK_IMAGES[type]
}
