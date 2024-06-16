import { createContext, FC, ReactNode, useContext } from "react"
import { useLocalStorage } from "usehooks-ts"
import { LOCALSTORAGE_KEYS, defaultStorageValues } from "../app/storage"
import { Font } from "../fonts"
import { Minutes, Seconds } from "../types/numbers"
import { ThemeMode } from "../types/ThemeMode"
import { DatedUnsplashImage } from "../types/Unsplash"

export type SettingsContextType = {
  keywords: string
  setKeywords: (keywords: string) => void
  blurRadius: number
  setBlurRadius: (blurRadius: number) => void
  brightness: number
  setBrightness: (brightness: number) => void
  changeIntervalInMin: Minutes
  setChangeIntervalInMin: (interval: Minutes) => void
  crossfadeInSec: Seconds
  setCrossfadeInSec: (crossfadeInSec: Seconds) => void
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  currentImage?: DatedUnsplashImage
  setCurrentImage: (image: DatedUnsplashImage) => void
  font: Font
  setFont: (font: Font) => void
  isOutlined: boolean
  setIsOutlined: (isOutlined: boolean) => void
  //   images?: JSON
  //   setImages: (images: JSON) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

export const useSettingsContext = (): SettingsContextType => {
  const context = useContext(SettingsContext)
  if (!context)
    throw new Error("useSettingsContext must be used within a SettingsProvider")
  return context
}

export const SettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentImage, setCurrentImage] = useLocalStorage<
    DatedUnsplashImage | undefined
  >(LOCALSTORAGE_KEYS.CURRENT_IMAGE, undefined)

  const [mode, setMode] = useLocalStorage(
    LOCALSTORAGE_KEYS.MODE,
    defaultStorageValues.MODE
  )

  const [keywords, setKeywords] = useLocalStorage(
    LOCALSTORAGE_KEYS.KEYWORDS,
    defaultStorageValues.KEYWORDS
  )
  const [blurRadius, setBlurRadius] = useLocalStorage(
    LOCALSTORAGE_KEYS.BLUR_RADIUS,
    defaultStorageValues.BLUR_RADIUS
  )

  const [brightness, setBrightness] = useLocalStorage(
    LOCALSTORAGE_KEYS.BRIGHTNESS,
    defaultStorageValues.BRIGHTNESS
  )

  const [changeIntervalInMin, setChangeIntervalInMin] = useLocalStorage(
    LOCALSTORAGE_KEYS.CHANGE_INTERVAL_MIN,
    defaultStorageValues.CHANGE_INTERVAL_MIN
  )

  const [crossfadeInSec, setCrossfadeInSec] = useLocalStorage(
    LOCALSTORAGE_KEYS.CROSSFADE_TIME,
    defaultStorageValues.CROSSFADE_TIME
  )

  const [font, setFont] = useLocalStorage(
    LOCALSTORAGE_KEYS.FONT,
    defaultStorageValues.FONT
  )

  const [isOutlined, setIsOutlined] = useLocalStorage(
    LOCALSTORAGE_KEYS.OUTLINE,
    defaultStorageValues.CLOCK.OUTLINE
  )

  return (
    <SettingsContext.Provider
      value={{
        keywords,
        setKeywords,
        blurRadius,
        setBlurRadius,
        brightness,
        setBrightness,
        changeIntervalInMin,
        setChangeIntervalInMin,
        crossfadeInSec,
        setCrossfadeInSec,
        mode,
        setMode,
        currentImage,
        setCurrentImage,
        font,
        setFont,
        isOutlined,
        setIsOutlined,
        // images,
        // setImages,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
