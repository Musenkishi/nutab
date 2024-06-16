import { Box, BoxProps, Typography } from "@mui/material"
import { FC } from "react"

type UnsplashLocationProps = BoxProps & {
  title: string
}

const UnsplashLocation: FC<UnsplashLocationProps> = ({ title, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        margin: 2,
        height: "auto",
        ...props.sx,
        // zIndex: zIndexes.text,
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>
    </Box>
  )
}

export default UnsplashLocation
