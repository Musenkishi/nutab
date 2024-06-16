import { Box, createTheme, Stack, ThemeProvider } from "@mui/material"
import { Theme } from "md3-theme-generator"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import getImage from "./Api"
import CrossfadeImage from "./components/crossfade/CrossfadeImage"
import AntiBurnInBox from "./components/main/AntiBurnInBox"
import StyledClock from "./components/main/StyledClock"
import UnsplashInfo from "./components/main/UnsplashInfo"
import UnsplashLocation from "./components/main/UnsplashLocation"
import Toolbar from "./components/toolbar/Toolbar"
import { useSettingsContext } from "./context/SettingsContext"
import { generateMD3Theme, md3ToMuiPalette } from "./theme/themeGenerator"
import { DatedUnsplashImage, UnsplashImage } from "./types/Unsplash"
import { getScreenSizedImageUrl } from "./util/unsplash"

const Tabscape = () => {
  const zIndexes = {
    clock: 20,
    text: 21,
    toolbar: 22,
  }

  const {
    mode,
    keywords,
    font,
    isOutlined,
    blurRadius,
    brightness,
    currentImage,
    setCurrentImage,
    changeIntervalInMin,
    crossfadeInSec,
  } = useSettingsContext()

  const [image, setImage_] = useState<UnsplashImage | undefined>(undefined)
  const [md3Theme, setMd3Theme] = useState<Theme>()

  const delayInMilliSecs = 1000 * 60 * changeIntervalInMin

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const preferedMode =
    mode === "auto" ? (prefersDarkMode ? "dark" : "light") : mode

  const setImage = async (uImage: UnsplashImage | undefined) => {
    if (!!uImage) {
      const _md3Theme = await generateMD3Theme(getScreenSizedImageUrl(uImage))
      setMd3Theme(_md3Theme)
    }
    setImage_(uImage)
  }

  const loadImage = useCallback(async () => {
    const image: UnsplashImage | undefined = await getImage(keywords as string)
    setImage(image)
    if (image) {
      const datedImage: DatedUnsplashImage = {
        ...image,
        retreived_at: new Date().getTime(),
      }
      setCurrentImage(datedImage)
    }
  }, [keywords])

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
        const datedImage: DatedUnsplashImage = currentImage
        const currentDate = new Date().getTime()
        const diffMilliSecs = currentDate - datedImage.retreived_at
        if (diffMilliSecs > delayInMilliSecs) {
          console.log("No image at boot, fetching...")
          loadImage()
        } else {
          setImage(currentImage)
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
          fontFamily: font,
          h1: {
            fontSize: "9rem",
          },
        },
      }),
    [mode, prefersDarkMode, md3Theme, font]
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
          durationMillis={crossfadeInSec * 1000}
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
        <AntiBurnInBox
          updateIntervalMinutes={changeIntervalInMin}
          sx={{ zIndex: zIndexes.clock }}
        >
          <StyledClock
            isOutlined={isOutlined}
            color={theme.palette.primary.main}
          />
        </AntiBurnInBox>
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          sx={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <UnsplashInfo
            sx={{ zIndex: zIndexes.text }}
            imageUrl={image?.links.html}
            userUrl={image?.user.links.html}
            username={image?.user.name}
          />
          <UnsplashLocation
            title={image?.location.title || image?.location.name || ""}
            sx={{
              zIndex: zIndexes.text,
            }}
          />
        </Stack>
        <Toolbar zIndex={zIndexes.toolbar} changeImage={loadImage} />
      </Box>
    </ThemeProvider>
  )
}

export default Tabscape
