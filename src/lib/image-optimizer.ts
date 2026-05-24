/**
 * Utility to dynamically optimize image URLs on-the-fly.
 * Routes heavy external image assets (like ImgBB JPEGs) through a Cloudflare-backed
 * dynamic image optimization proxy (images.weserv.nl).
 * Transforms format to modern WebP, scales width/height, and applies compression.
 */

export interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'png' | 'jpeg';
}

/**
 * Optimizes an image URL by applying dynamic resizing and WebP compression.
 * If the URL is already optimized, local, or invalid, it returns the original URL.
 * 
 * @param url The original image URL (e.g., hosted on ImgBB)
 * @param options Optimization options (width, height, quality, format)
 * @returns The optimized URL served from the high-speed CDN proxy
 */
export function optimizeImage(url: string | undefined, options: OptimizeOptions = {}): string {
  if (!url) return '';

  // Return immediately if it's already a relative path, local import, SVG, or a youtube thumbnail
  if (
    url.startsWith('/') ||
    url.startsWith('data:') ||
    url.includes('.svg') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be')
  ) {
    return url;
  }

  const {
    width,
    height,
    quality = 80, // Default web compression quality
    format = 'webp', // Default to modern WebP format
  } = options;

  try {
    const encodedUrl = encodeURIComponent(url);
    let optimizedUrl = `https://images.weserv.nl/?url=${encodedUrl}`;

    // Apply width constraints
    if (width) {
      optimizedUrl += `&w=${width}`;
    }

    // Apply height constraints
    if (height) {
      optimizedUrl += `&h=${height}`;
      optimizedUrl += `&fit=cover`; // Keep aspect ratio and crop nicely if height is provided
    }

    // Apply compression quality
    optimizedUrl += `&q=${quality}`;

    // Force high-efficiency format (WebP / AVIF)
    optimizedUrl += `&output=${format}`;

    return optimizedUrl;
  } catch (error) {
    console.warn("Failed to encode image URL for optimization:", url, error);
    return url; // Safe fallback in case of errors
  }
}
