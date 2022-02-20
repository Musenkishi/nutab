import { localStorageKeys } from "./app/storage";
import UnsplashImage from "./types/Unsplash";

const fetchImages = async (query: string) => {
  const url = new URL("https://api.unsplash.com/photos/random");

  const params = url.searchParams;
  params.append("orientation", "landscape");
  params.append("featured", "true");
  params.append("query", query);
  params.append("count", "30");

  const headers = new Headers();
  headers.append(
    "Authorization",
    "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY
  );

  const response = await fetch(url.toString(), { headers });
  const images: UnsplashImage[] = await response.json();
  return images;
};

const getStoredImages = () => {
  const storedImagesJson = localStorage.getItem(localStorageKeys.IMAGES);
  const storedImages: UnsplashImage[] = JSON.parse(storedImagesJson || "[]");
  return storedImages;
};

const setStoredImages = (images: UnsplashImage[]) => {
  localStorage.setItem(localStorageKeys.IMAGES, JSON.stringify(images));
};

const getImage = async (query: string) => {
  const storedImages = getStoredImages();
  if (storedImages.length > 0) {
    const image = storedImages.shift();
    setStoredImages(storedImages);
    return image;
  } else {
    const images = await fetchImages(query);
    if (images) {
      const image = images.shift();
      setStoredImages(images);
      return image;
    }
  }
  return;
};

export default getImage;
