import { Font } from "../fonts"
import { ThemeMode } from "../types/ThemeMode"

export type LocalStorageTypes = {
  KEYWORDS: string
  BLUR_RADIUS: number
  BRIGHTNESS: number
  CHANGE_INTERVAL_SEC: number
  CROSSFADE_TIME: number
  MODE: ThemeMode
  IMAGES?: JSON
  CURRENT_IMAGE?: string
  FONT: Font
  CLOCK: {
    OUTLINE: boolean
  }
}

export enum LOCALSTORAGE_KEYS {
  KEYWORDS = "NuTabKeyWords",
  BLUR_RADIUS = "NuTabBlurRadius",
  BRIGHTNESS = "NuTabBrightness",
  IMAGES = "NuTabImages",
  CURRENT_IMAGE = "NuTabCurrentImage",
  CHANGE_INTERVAL_SEC = "NuTabChangeInterval",
  CROSSFADE_TIME = "NuTabCrossfadeTime",
  MODE = "NuTabMode",
  FONT = "NuTabFont",
  OUTLINE = "NuTabOutline",
}

export const defaultStorageValues: LocalStorageTypes = {
  KEYWORDS: "green flower macro",
  BLUR_RADIUS: 0.4,
  BRIGHTNESS: 1.0,
  CHANGE_INTERVAL_SEC: 300,
  CROSSFADE_TIME: 2,
  MODE: "auto",
  FONT: Font.Nunito,
  CLOCK: {
    OUTLINE: false,
  },
}
