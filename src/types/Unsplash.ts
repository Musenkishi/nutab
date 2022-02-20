type Location = {
  title: string;
  name: string;
  city: string;
  country: string;
  position: {
    latitude: string;
    longitude: string;
  };
};

type Exif = {
  make: string;
  model: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
};

type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

type Links = {
  self: string;
  html: string;
  download: string;
  download_location: string;
  photos: string;
  likes: string;
  portfolio: string;
};

type User = {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  portfolio_url: string;
  bio: string;
  location: string;
  total_likes: number;
  total_photos: number;
  total_collections: number;
  instagram_username: string;
  links: Links;
};

type Collection = {
  id: number;
  title: string;
  published_at: string;
  last_colleted_at: string;
  updated_at: string;
};

export type UnsplashImage = {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  blur_hash: string;
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  description: string;
  alt_description: string;
  exif: Exif;
  location: Location;
  current_user_collections: Collection[];
  urls: Urls;
  links: Links;
  user: User;
};

export type UnsplashImageCollection = {
  query: string;
  images: UnsplashImage[];
};
