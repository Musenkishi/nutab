import { Typography } from "@mui/material"
import { FC } from "react"
import Clock from "react-live-clock"

type StyledClockProps = {
    isOutlined: boolean,
    color: string,
}

const StyledClock: FC<StyledClockProps> = ({isOutlined, color}) => {
  return (
    <Typography
      variant="h1"
      sx={{
        ...(isOutlined && {
          "-webkit-text-stroke-width": "0.25rem",
          "-webkit-text-stroke-color": color,
          color: "transparent",
        }),
      }}
    >
      <Clock format={"HH:mm"} ticking={true} />
    </Typography>
  )
}

export default StyledClock
