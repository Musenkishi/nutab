import { createTheme, PaletteMode, ThemeOptions } from "@mui/material"
import { generatePaletteFromURL, Theme } from "md3-theme-generator"

export const md3ToMuiPalette = (
  md3Theme: Theme,
  mode: PaletteMode
): ThemeOptions["palette"] => {
  const colors = mode === "dark" ? md3Theme.dark : md3Theme.light

  return {
    mode: mode,
    primary: {
      main: colors.primary,
      contrastText: colors.onPrimary,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.onSecondary,
    },
    error: {
      main: colors.error,
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

export const generateMD3Theme = async (imgBuffer: ArrayBuffer) => {
  const palette = await generatePaletteFromURL(imgBuffer)
  const theme = palette.save()
  return theme
}

export const generateMuiTheme = async (
  imgBuffer: ArrayBuffer,
  mode: PaletteMode = "light"
) => {
  const md3Theme = await generateMD3Theme(imgBuffer)
  const muiTheme = createTheme({
    palette: md3ToMuiPalette(md3Theme, mode),
  })
  return muiTheme
}
