export type LocalStorageTypes = {
  KEYWORDS: string;
  BLUR_RADIUS: number;
  BRIGHTNESS: number;
  CHANGE_INTERVAL_SEC: number;
  CROSSFADE_TIME: number;
  IMAGES?: JSON;
  CURRENT_IMAGE?: string;
};

export enum LOCALSTORAGE_KEYS {
  KEYWORDS = "NuTabKeyWords",
  BLUR_RADIUS = "NuTabBlurRadius",
  BRIGHTNESS = "NuTabBrightness",
  IMAGES = "NuTabImages",
  CURRENT_IMAGE = "NuTabCurrentImage",
  CHANGE_INTERVAL_SEC = "NuTabChangeInterval",
  CROSSFADE_TIME = "NuTabCrossfadeTime",
}

export const defaultStorageValues: LocalStorageTypes = {
  KEYWORDS: "green flower macro",
  BLUR_RADIUS: 0.4,
  BRIGHTNESS: 1.0,
  CHANGE_INTERVAL_SEC: 300,
  CROSSFADE_TIME: 2
};
