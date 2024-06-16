import { Box, BoxProps } from "@mui/material"
import { FC, ReactNode, useEffect, useState } from "react"
import { Minutes } from "../../types/numbers"
import { getRandomOffset } from "../../util/math"

type AntiBurnInBoxProps = BoxProps & {
  updateIntervalMinutes: Minutes
  children: ReactNode
}

const AntiBurnInBox: FC<AntiBurnInBoxProps> = ({
  children,
  updateIntervalMinutes,
  ...props
}) => {
  const pixelOffset = 5
  const [widgetTop, setWidgetTop] = useState(getRandomOffset(pixelOffset))
  const [widgetLeft, setWidgetLeft] = useState(getRandomOffset(pixelOffset))

  useEffect(() => {
    const updatePosition = () => {
      const newTop = getRandomOffset(pixelOffset)
      const newLeft = getRandomOffset(pixelOffset)
      setWidgetTop(newTop)
      setWidgetLeft(newLeft)
    }

    const interval = setInterval(
      updatePosition,
      updateIntervalMinutes * 60 * 1000
    )
    return () => clearInterval(interval)
    // Only run this effect once, on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box
      {...props}
      sx={{
        position: "absolute",
        top: widgetTop,
        left: widgetLeft,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "2s",
        ...props.sx,
      }}
    >
      {children}
    </Box>
  )
}

export default AntiBurnInBox
