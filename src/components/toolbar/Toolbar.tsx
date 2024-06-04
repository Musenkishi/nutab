import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import SettingsIcon from "@mui/icons-material/Settings"
import SkipNextIcon from "@mui/icons-material/SkipNext"
import { IconButton, Stack, StackTypeMap, Tooltip } from "@mui/material"
import React, { forwardRef, useState } from "react"
import Settings from "../settings/Settings"
import TooltipIconButton from "../settings/TooltipIconButton"

type Props = {
  zIndex: number
  changeImage: () => void
}

const Toolbar = forwardRef<StackTypeMap, Props>((props, ref) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  return (
    <Stack
      ref={ref}
      direction="row"
      gap={1}
      sx={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        height: "auto",
        zIndex: props.zIndex,
        opacity: 0.05,
        transition: "0.3s",
        "&:hover": {
          opacity: 1.0,
        },
      }}
    >
      <TooltipIconButton
        tooltipTitle="Change image"
        icon={<SkipNextIcon />}
        onClick={props.changeImage}
      />
      {document.fullscreenEnabled && (
        <TooltipIconButton
          tooltipTitle="Toggle fullscreen"
          icon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          onClick={toggleFullscreen}
        />
      )}
      <TooltipIconButton
        tooltipTitle="Settings"
        icon={<SettingsIcon />}
        onClick={() => setSettingsDialogOpen(true)}
      />
      <Settings
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
      />
    </Stack>
  )
})

export default Toolbar
