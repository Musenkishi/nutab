declare module "md3-theme-generator" {
  type ColorScheme = {
    primary: string
    onPrimary: string
    primaryContainer: string
    onPrimaryContainer: string
    secondary: string
    onSecondary: string
    secondaryContainer: string
    onSecondaryContainer: string
    tertiary: string
    onTertiary: string
    tertiaryContainer: string
    onTertiaryContainer: string
    error: string
    errorContainer: string
    onError: string
    onErrorContainer: string
    background: string
    onBackground: string
    surface: string
    onSurface: string
    surfaceVariant: string
    onSurfaceVariant: string
    outline: string
    inverseOnSurface: string
    inverseSurface: string
  }

  type LuminancePalette = {
    luminance100: string
    luminance99: string
    luminance98: string
    luminance95: string
    luminance90: string
    luminance80: string
    luminance70: string
    luminance60: string
    luminance50: string
    luminance40: string
    luminance35: string
    luminance30: string
    luminance25: string
    luminance20: string
    luminance10: string
    luminance0: string
  }

  type TextStyle = {
    fontFamilyName: string
    fontFamilyStyle: string
    fontSize: number
    lineHeight: number
    letterSpacing: number
    paragraphSpacing: number
  }

  type Styles = {
    display1: TextStyle
    display2: TextStyle
    display3: TextStyle
    headline1: TextStyle
    headline2: TextStyle
    headline3: TextStyle
    headline4: TextStyle
    headline5: TextStyle
    headline6: TextStyle
    subhead1: TextStyle
    subhead2: TextStyle
    button: TextStyle
    body1: TextStyle
    body2: TextStyle
    caption: TextStyle
    overline: TextStyle
    labelSmall: TextStyle
  }

  type Source = {
    seed: string
    primary: string
    secondary: string
    tertiary: string
    neutral: string
    neutralVariant: string
    error: string
  }

  type Theme = {
    light: ColorScheme
    dark: ColorScheme
    primary: LuminancePalette
    secondary: LuminancePalette
    tertiary: LuminancePalette
    neutral: LuminancePalette
    neutralVariant: LuminancePalette
    error: LuminancePalette
    styles: Styles
    source: Source
  }

  interface TonalGroup {
    [key: string]: string
  }

  interface ThemeAdapterProps {
    tones: CorePalette
    seed: string
    is3p: boolean
    overrides: any
    blend: boolean
    isBaseline: boolean
    imageUrl?: string
  }

  interface CorePalette {
    [key: string]: TonalGroup
  }

  export class ThemeAdapter {
    constructor(props: ThemeAdapterProps)
    static fromColor(
      value: string,
      is3p: boolean,
      overrides?: any
    ): ThemeAdapter
    static baselineSeed(is3p: boolean): string
    static fromTheme(theme: any): ThemeAdapter
    static default(is3p?: boolean): ThemeAdapter

    get isBaseline(): boolean
    get is3p(): boolean
    get styles(): any
    get imageUrl(): string
    get light(): any
    get dark(): any
    get androidLight(): any
    get androidDark(): any
    get tonalGroups(): any
    get primaryGroup(): TonalGroup
    get secondaryGroup(): TonalGroup
    get tertiaryGroup(): TonalGroup
    get neutralGroup(): TonalGroup
    get neutralVariantGroup(): TonalGroup
    get errorGroup(): TonalGroup
    get primary(): TonalGroup
    get secondary(): TonalGroup
    get tertiary(): TonalGroup
    get neutral(): TonalGroup
    get neutralVariant(): TonalGroup
    get error(): TonalGroup
    get palettes(): Map<string, string>
    get seedValue(): string
    get source(): any

    setCustomColor(key: string, value: string): void
    save(): Theme
  }

  export function generatePaletteFromURL(url: string | ArrayBuffer): Promise<ThemeAdapter>
}
