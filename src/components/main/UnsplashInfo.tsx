import { Stack, StackProps, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import NuLink from "../link/NuLink"

type UnsplashInfoProps = StackProps & {
  imageUrl?: string
  userUrl?: string
  username?: string
}

const UnsplashInfo: FC<UnsplashInfoProps> = ({
  imageUrl,
  userUrl,
  username,
  ...props
}) => {
  return (
    <Stack
      {...props}
      direction="row"
      gap={1}
      sx={{
        margin: 2,
        height: "auto",
        opacity: 0.1,
        transition: "0.3s",
        "&:hover": {
          opacity: 1.0,
        },
        ...props.sx,
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
            fillRule="nonzero"
          />
        </SvgIcon>
      </NuLink>
      <NuLink
        href={imageUrl}
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
        href={userUrl}
        color="inherit"
        underline="none"
        variant="subtitle2"
      >
        {username}
      </NuLink>
    </Stack>
  )
}

export default UnsplashInfo
