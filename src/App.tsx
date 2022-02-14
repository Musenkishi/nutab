import { Box, Stack, SvgIcon, ThemeProvider, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import Clock from "react-live-clock";
import { useReadLocalStorage } from "usehooks-ts";
import Api from "./Api";
import "./App.css";
import { localStorageKeys } from "./app/storage";
import CrossfadeImage from "./components/crossfade/CrossfadeImage";
import NuLink from "./components/link/NuLink";
import Toolbar from "./components/toolbar/Toolbar";
import theme from "./theme/theme";
import UnsplashImage from "./types/Unsplash";

const App = () => {
  const zIndexes = {
    clock: 20,
    text: 21,
    toolbar: 22,
  };

  const getRandomInt = () => {
    const pixels = 5;
    const min = Math.ceil(-pixels);
    const max = Math.floor(pixels);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const keywords = useReadLocalStorage(localStorageKeys.KEYWORDS);
  const blurRadius = useReadLocalStorage(localStorageKeys.BLUR_RADIUS);
  const brightness = useReadLocalStorage(localStorageKeys.BRIGHTNESS);
  const [widgetTop, setWidgetTop] = useState(getRandomInt());
  const [widgetLeft, setWidgetLeft] = useState(getRandomInt());
  const [image, setImage] = useState<UnsplashImage | undefined>(undefined);

  const delayInMilliSecs = 1000 * 60 * 5;

  const loadImage = useCallback(async () => {
    const preventScreenBurnIn = () => {
      setWidgetTop(getRandomInt());
      setWidgetLeft(getRandomInt());
    };
    const image: UnsplashImage = await Api(keywords as string);
    setImage(image);
    preventScreenBurnIn();
  }, [keywords]);

  const getScreenSizedImageUrl = (image?: UnsplashImage) => {
    if (image) {
      const url = new URL(image.urls.full);
      const params = url.searchParams;
      params.append("w", window.screen.width.toString());
      params.append("h", window.screen.height.toString());
      return url.toString();
    } else {
      return "";
    }
  };

  useEffect(() => {
    const interval = setInterval(loadImage, delayInMilliSecs);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (!image) {
      console.log("No image at boot, fetching...");
      loadImage();
    }
  }, [image, loadImage]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          overflow: "hidden",
          backgroundColor: "background.default",
          color: "text.primary",
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
            filter:
              "blur(" + blurRadius + "rem) brightness(" + brightness + ")",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            boxShadow: "inset 0 0 0rem #000",
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
                fill-rule="nonzero"
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
  );
};

export default App;
