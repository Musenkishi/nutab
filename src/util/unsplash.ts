import { UnsplashImage } from "../types/Unsplash"

export function getScreenSizedImageUrl(image?: UnsplashImage): string {
  if (!image) return ""
  const url = new URL(image.urls.full)
  const params = url.searchParams
  params.append("w", window.screen.width.toString())
  params.append("h", window.screen.height.toString())
  return url.toString()
}
