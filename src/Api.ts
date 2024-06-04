import { LOCALSTORAGE_KEYS } from "./app/storage"
import { UnsplashImage, UnsplashImageCollection } from "./types/Unsplash"

const fetchImages = async (query: string) => {
  const url = new URL("https://api.unsplash.com/photos/random")

  const params = url.searchParams
  params.append("orientation", "landscape")
  params.append("featured", "true")
  params.append("query", query)
  params.append("count", "30")

  const headers = new Headers()
  headers.append(
    "Authorization",
    "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY
  )

  const response = await fetch(url.toString(), { headers })
  const images: UnsplashImage[] = await response.json()
  return images
}

const getStoredCollection = () => {
  const storedImagesJson = localStorage.getItem(LOCALSTORAGE_KEYS.IMAGES)
  const storedImages: UnsplashImageCollection = JSON.parse(
    storedImagesJson || '{"query":"", "images":[]}'
  )
  return storedImages
}

const setStoredCollection = (collection: UnsplashImageCollection) => {
  localStorage.setItem(LOCALSTORAGE_KEYS.IMAGES, JSON.stringify(collection))
}

const getImage = async (query: string) => {
  const storedImages = getStoredCollection()
  const isNewQuery = query !== storedImages.query
  if (!isNewQuery && storedImages && storedImages.images.length > 0) {
    const image = storedImages.images.shift()
    setStoredCollection(storedImages)
    return image
  } else {
    const images = await fetchImages(query)
    if (images) {
      const image = images.shift()
      setStoredCollection({ query, images })
      return image
    }
  }
  return
}

export default getImage
