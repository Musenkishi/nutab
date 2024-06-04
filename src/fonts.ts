import "@fontsource/concert-one"
import "@fontsource/luckiest-guy"
import "@fontsource/poiret-one"
import "@fontsource/titan-one"
import "@fontsource/montserrat"
import "@fontsource/nunito/200.css"
import "@fontsource/orbitron/400.css"

export enum Font {
  ConcertOne = '"Concert One"',
  LuckiestGuy = '"Luckiest Guy"',
  Montserrat = "Montserrat",
  Nunito = "Nunito",
  Orbitron = "Orbitron",
  PoiretOne = '"Poiret One"',
  TitanOne = '"Titan One"',
}

export const unquoteFontName = (font: string): string => {
  return font.replace(/"/g, '');
};
