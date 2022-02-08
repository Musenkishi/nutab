import UnsplashImage from "./types/Unsplash";

const Api = async (query: string) => {
  const url = new URL("https://api.unsplash.com/photos/random");

  const params = url.searchParams;
  params.append("orientation", "landscape");
  params.append("featured", "true");
  params.append("query", query);

  const headers = new Headers();
  headers.append("Authorization", "Client-ID " + process.env.REACT_APP_UNSPLASH_API_KEY);

  const response = await fetch(url.toString(), { headers });
  const image: UnsplashImage = await response.json();
  return image;
};
export default Api;
