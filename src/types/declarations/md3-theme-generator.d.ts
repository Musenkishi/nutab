declare module 'md3-theme-generator' {
  
    interface TonalGroup {
      [key: string]: string;
    }
  
    interface ThemeAdapterProps {
      tones: CorePalette;
      seed: string;
      is3p: boolean;
      overrides: any;
      blend: boolean;
      isBaseline: boolean;
      imageUrl?: string;
    }
  
    interface CorePalette {
      [key: string]: TonalGroup;
    }
  
    export class ThemeAdapter {
      constructor(props: ThemeAdapterProps);
      static fromColor(value: string, is3p: boolean, overrides?: any): ThemeAdapter;
      static baselineSeed(is3p: boolean): string;
      static fromTheme(theme: any): ThemeAdapter;
      static default(is3p?: boolean): ThemeAdapter;
  
      get isBaseline(): boolean;
      get is3p(): boolean;
      get styles(): any;
      get imageUrl(): string;
      get light(): any;
      get dark(): any;
      get androidLight(): any;
      get androidDark(): any;
      get tonalGroups(): any;
      get primaryGroup(): TonalGroup;
      get secondaryGroup(): TonalGroup;
      get tertiaryGroup(): TonalGroup;
      get neutralGroup(): TonalGroup;
      get neutralVariantGroup(): TonalGroup;
      get errorGroup(): TonalGroup;
      get primary(): TonalGroup;
      get secondary(): TonalGroup;
      get tertiary(): TonalGroup;
      get neutral(): TonalGroup;
      get neutralVariant(): TonalGroup;
      get error(): TonalGroup;
      get palettes(): Map<string, string>;
      get seedValue(): string;
      get source(): any;
  
      setCustomColor(key: string, value: string): void;
      save(): any;
    }
  
    export function generatePaletteFromURL(url: string): ThemeAdapter;
  }
  