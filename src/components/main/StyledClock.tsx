import { Typography, TypographyProps } from "@mui/material"
import { FC } from "react"
import Clock from "react-live-clock"
import { useSettingsContext } from "../../context/SettingsContext"

type StyledClockProps = TypographyProps & {
  isOutlined: boolean
  color: string
}

const StyledClock: FC<StyledClockProps> = ({ isOutlined, color, ...props }) => {
  const { font } = useSettingsContext()
  return (
    <Typography
      variant="h1"
      sx={{
        ...props,
        ...(isOutlined && {
          "-webkit-text-stroke-width": "0.25rem",
          "-webkit-text-stroke-color": color,
          color: "transparent",
        }),
      }}
      fontFamily={font}
    >
      <Clock format={"HH:mm"} ticking={true} />
    </Typography>
  )
}

export default StyledClock
