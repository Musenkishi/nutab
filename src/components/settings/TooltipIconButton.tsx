import {
  IconButton,
  IconButtonProps,
  Tooltip,
  TooltipProps,
} from "@mui/material"
import React from "react"

interface TooltipIconButtonProps extends IconButtonProps {
  tooltipTitle: string
  tooltipProps?: TooltipProps
  icon: React.ReactElement
}

const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
  tooltipTitle,
  tooltipProps,
  icon,
  ...iconButtonProps
}) => {
  return (
    <Tooltip title={tooltipTitle} arrow {...tooltipProps}>
      <IconButton color="inherit" {...iconButtonProps}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default TooltipIconButton
