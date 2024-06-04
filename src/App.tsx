import {
  Box,
  Stack,
  SvgIcon,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import Clock from "react-live-clock"
import {
  useLocalStorage,
  useMediaQuery,
  useReadLocalStorage,
} from "usehooks-ts"
import getImage from "./Api"
import "./App.css"
import { LOCALSTORAGE_KEYS, defaultStorageValues } from "./app/storage"
import CrossfadeImage from "./components/crossfade/CrossfadeImage"
import NuLink from "./components/link/NuLink"
import Toolbar from "./components/toolbar/Toolbar"
import { MD3Theme } from "./theme/md3Theme"
import { generateMD3Theme, md3ToMuiPalette } from "./theme/themeGenerator"
import { ThemeMode } from "./types/ThemeMode"
import { DatedUnsplashImage, UnsplashImage } from "./types/Unsplash"

const App = () => {
  const zIndexes = {
    clock: 20,
    text: 21,
    toolbar: 22,
  }

  const getRandomInt = () => {
    const pixels = 5
    const min = Math.ceil(-pixels)
    const max = Math.floor(pixels)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const themeMode: ThemeMode =
    useReadLocalStorage(LOCALSTORAGE_KEYS.MODE) || defaultStorageValues.MODE

  const keywords =
    useReadLocalStorage(LOCALSTORAGE_KEYS.KEYWORDS) ||
    defaultStorageValues.KEYWORDS

  const [blurRadius, setBlur] = useLocalStorage(
    LOCALSTORAGE_KEYS.BLUR_RADIUS,
    defaultStorageValues.BLUR_RADIUS
  )

  const [brightness, setBrightness] = useLocalStorage(
    LOCALSTORAGE_KEYS.BRIGHTNESS,
    defaultStorageValues.BRIGHTNESS
  )

  const [currentImage, setCurrentImage] = useLocalStorage(
    LOCALSTORAGE_KEYS.CURRENT_IMAGE,
    ""
  )

  const [changeIntervalInMin, setChangeIntervalInSec] = useLocalStorage(
    LOCALSTORAGE_KEYS.CHANGE_INTERVAL_SEC,
    defaultStorageValues.CHANGE_INTERVAL_SEC
  )

  const [crossfadeDuration, setCrossfadeDuration] = useLocalStorage(
    LOCALSTORAGE_KEYS.CROSSFADE_TIME,
    defaultStorageValues.CROSSFADE_TIME
  )

  const [widgetTop, setWidgetTop] = useState(getRandomInt())
  const [widgetLeft, setWidgetLeft] = useState(getRandomInt())
  const [image, setImage_] = useState<UnsplashImage | undefined>(undefined)
  const [md3Theme, setMd3Theme] = useState<MD3Theme>()

  const delayInMilliSecs = 1000 * 60 * changeIntervalInMin

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const preferedMode =
    themeMode === "auto" ? (prefersDarkMode ? "dark" : "light") : themeMode

  const setImage = async (uImage: UnsplashImage | undefined) => {
    if (!!uImage) {
      const _md3Theme = await generateMD3Theme(getScreenSizedImageUrl(uImage))
      setMd3Theme(_md3Theme)
    }
    setImage_(uImage)
  }

  const loadImage = useCallback(async () => {
    const preventScreenBurnIn = () => {
      setWidgetTop(getRandomInt())
      setWidgetLeft(getRandomInt())
    }
    const image: UnsplashImage | undefined = await getImage(keywords as string)
    setImage(image)
    if (image) {
      const datedImage: DatedUnsplashImage = {
        ...image,
        retreived_at: new Date().getTime(),
      }
      setCurrentImage(JSON.stringify(datedImage))
    }
    preventScreenBurnIn()
  }, [keywords])

  const getScreenSizedImageUrl = (image?: UnsplashImage) => {
    if (image) {
      const url = new URL(image.urls.full)
      const params = url.searchParams
      params.append("w", window.screen.width.toString())
      params.append("h", window.screen.height.toString())
      return url.toString()
    } else {
      return ""
    }
  }

  useEffect(() => {
    const interval = setInterval(loadImage, delayInMilliSecs)
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (!image) {
      if (!currentImage) {
        console.log("No image at boot, fetching...")
        loadImage()
      } else {
        const datedImage: DatedUnsplashImage = JSON.parse(currentImage)
        const currentDate = new Date().getTime()
        const diffMilliSecs = currentDate - datedImage.retreived_at
        if (diffMilliSecs > delayInMilliSecs) {
          console.log("No image at boot, fetching...")
          loadImage()
        } else {
          setImage(JSON.parse(currentImage))
        }
      }
    }
  }, [currentImage, delayInMilliSecs, image, loadImage])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          ...(md3Theme && md3ToMuiPalette(md3Theme, preferedMode)),
          mode: preferedMode,
        },
        typography: {
          fontFamily: "Nunito",
          h1: {
            fontSize: "9rem",
          },
        },
      }),
    [themeMode, prefersDarkMode, md3Theme]
  )

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "background.default",
          color: "primary.main",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <CrossfadeImage
          src={getScreenSizedImageUrl(image)}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          parentStyle={{
            position: "initial!important",
            flexGrow: 2,
            width: "100%",
            height: "100%",
          }}
          durationMillis={crossfadeDuration * 1000}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            boxShadow: "inset 0 0 0rem #000",
            backdropFilter: `blur(${blurRadius}rem) brightness(${brightness})`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: widgetTop,
            left: widgetLeft,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: zIndexes.clock,
            transition: "2s",
          }}
        >
          <Typography variant="h1">
            <Clock format={"HH:mm"} ticking={true} />
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            margin: 2,
            height: "auto",
            zIndex: zIndexes.text,
          }}
        >
          <Typography variant="subtitle2">
            {image?.location.title || image?.location.name || ""}
          </Typography>
        </Box>
        <Stack
          direction="row"
          gap={1}
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            margin: 2,
            height: "auto",
            zIndex: zIndexes.text,
            opacity: 0.1,
            transition: "0.3s",
            "&:hover": {
              opacity: 1.0,
            },
          }}
        >
          <NuLink
            href="https://unsplash.com"
            color="inherit"
            underline="none"
            variant="subtitle2"
          >
            <SvgIcon fontSize="inherit" viewBox="0 0 32 32">
              <path
                d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"
                fillRule="nonzero"
              />
            </SvgIcon>
          </NuLink>
          <NuLink
            href={image?.links.html}
            color="inherit"
            underline="none"
            variant="subtitle2"
          >
            Photo
          </NuLink>
          <Typography color="inherit" variant="subtitle2">
            by
          </Typography>
          <NuLink
            href={image?.user.links.html}
            color="inherit"
            underline="none"
            variant="subtitle2"
          >
            {image?.user.name}
          </NuLink>
        </Stack>
        <Toolbar zIndex={zIndexes.toolbar} changeImage={loadImage} />
      </Box>
    </ThemeProvider>
  )
}

export default App
