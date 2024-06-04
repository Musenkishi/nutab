import { PaletteMode, ThemeOptions, createTheme } from "@mui/material"
import { generatePaletteFromURL } from "md3-theme-generator"
import { MD3Theme } from "./md3Theme"

export const md3ToMuiPalette = (
  md3Theme: MD3Theme,
  mode: PaletteMode
): ThemeOptions["palette"] => {
  const colors = mode === "dark" ? md3Theme.dark : md3Theme.light

  return {
    mode: mode,
    primary: {
      main: colors.primary,
      light: md3Theme.primary.luminance80, // Example light variation
      dark: md3Theme.primary.luminance40, // Example dark variation
      contrastText: colors.onPrimary,
    },
    secondary: {
      main: colors.secondary,
      light: md3Theme.secondary.luminance80, // Example light variation
      dark: md3Theme.secondary.luminance40, // Example dark variation
      contrastText: colors.onSecondary,
    },
    error: {
      main: colors.error,
      light: md3Theme.error.luminance80, // Example light variation
      dark: md3Theme.error.luminance40, // Example dark variation
      contrastText: colors.onError,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.onBackground,
      secondary: colors.onSurface,
    },
  }
}

export const generateMD3Theme = async (url: string) => {
  const palette = await generatePaletteFromURL(url)
  const theme: MD3Theme = palette.save()
  return theme
}

export const generateMuiTheme = async (
  url: string,
  mode: PaletteMode = "light"
) => {
  const md3Theme = await generateMD3Theme(url)
  const muiTheme = createTheme({
    palette: md3ToMuiPalette(md3Theme, mode),
  })

  return muiTheme
}
