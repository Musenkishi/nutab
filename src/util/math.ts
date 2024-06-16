export const getRandomOffset = (range: number) => {
  const min = Math.ceil(-range)
  const max = Math.floor(range)
  return Math.floor(Math.random() * (max - min) + min)
}
