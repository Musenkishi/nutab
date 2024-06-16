import { PaletteMode, ThemeOptions, createTheme } from "@mui/material"
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

export const generateMD3Theme = async (url: string) => {
  const palette = await generatePaletteFromURL(url)
  const theme = palette.save()
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
