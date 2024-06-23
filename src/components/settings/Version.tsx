import { capitalize, Link, Stack, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import pkg from "../../../package.json"
import TabScapeLogoSvg from "../../assets/TabScapeLogo"

type VersionProps = {}

const Version: FC<VersionProps> = (props) => {
  return (
    <Link href="https://github.com/Musenkishi/nutab" target="_blank" underline="none">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{
          opacity: 0.25,
          transition: "0.3s",
          "&:hover": {
            opacity: 1.0,
          },
        }}
      >
        <SvgIcon color="inherit">
          <TabScapeLogoSvg />
        </SvgIcon>
        <Typography variant="subtitle1">{capitalize(pkg.name)}</Typography>
        <Typography variant="subtitle1">{pkg.version}</Typography>
      </Stack>
    </Link>
  )
}

export default Version
