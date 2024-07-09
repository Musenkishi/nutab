import { Close } from "@mui/icons-material"
import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material"
import { ChangeEvent, FocusEvent, FunctionComponent, useState } from "react"
import { useSettingsContext } from "../../context/SettingsContext"
import FontSelect from "./FontSelect"
import ModeButton from "./ModeButton"
import TooltipIconButton from "./TooltipIconButton"
import Version from "./Version"

type SettingsProps = {
  open: boolean
  onClose?: () => void
}

const Settings: FunctionComponent<SettingsProps> = (props) => {
  const {
    mode,
    setMode,
    keywords,
    setKeywords,
    blurRadius,
    setBlurRadius,
    brightness,
    setBrightness,
    changeIntervalInMin,
    setChangeIntervalInMin,
    crossfadeInSec,
    setCrossfadeInSec,
    font,
    setFont,
    isOutlined,
    setIsOutlined,
  } = useSettingsContext()

  const [intervalValue, setIntervalValue] = useState<string | number>(
    changeIntervalInMin
  )

  const idKeywords = "idKeywords"
  const idBlur = "idBlur"
  const idBrightness = "idBrightness"
  const idIntervalTime = "idIntervalTime"
  const idCrossfadeTime = "idCrossfadeTime"
  const idFontOutline = "idFontOutline"

  const handleClose = () => {
    props.onClose && props.onClose()
  }

  const ensureNumber = (value: string): number => {
    const numberValue = Number.parseInt(value.replace(/\D/g, ""))
    return Number.isNaN(numberValue) ? 0 : numberValue
  }

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    checked?: boolean
  ) => {
    switch (event.target.id) {
      case idKeywords:
        setKeywords(event.target.value)
        break
      case idIntervalTime:
        const onlyNumbers = ensureNumber(event.currentTarget.value)
        const ensure5MinutesOrGreater = onlyNumbers > 5 ? onlyNumbers : 5
        setChangeIntervalInMin(ensure5MinutesOrGreater)
        setIntervalValue(ensure5MinutesOrGreater)
        break
      case idCrossfadeTime:
        setCrossfadeInSec(ensureNumber(event.currentTarget.value))
        break
      case idFontOutline:
        if (checked != null) setIsOutlined(checked)
        break
    }
  }

  const valueLabelFormat = (value: number) => {
    //Convert decimal to percent
    return Math.round(value * 100) + " %"
  }

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const value = newValue as number
    switch (event.target.name) {
      case idBlur:
        setBlurRadius(value)
        break
      case idBrightness:
        setBrightness(value)
        break
    }
  }

  return (
    <Drawer
      BackdropProps={{ invisible: true }}
      anchor="right"
      open={props.open}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Settings
        <Stack direction="row" spacing="1rem">
          <ModeButton
            mode={mode}
            onChange={(newMode) => {
              setMode(newMode)
            }}
          />
          <TooltipIconButton
            tooltipTitle={"Close"}
            icon={<Close/>}
            onClick={handleClose}
          />
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <FormGroup sx={{ gap: 2 }}>
          <DialogContentText>
            What kind of images do you want as background?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={idKeywords}
            label="Keywords (e.g. 'mountains night')"
            type="search"
            fullWidth
            onChange={handleChange}
            defaultValue={keywords}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") handleClose()
            }}
          />
          <Divider />
          <Stack spacing={2} paddingLeft={4} paddingRight={4}>
            <Typography variant="body1">Background effects</Typography>
            <FormControlLabel
              labelPlacement="top"
              control={
                <Slider
                  name={idBrightness}
                  value={brightness}
                  step={0.1}
                  marks
                  min={0.0}
                  max={2.0}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLabelFormat}
                  onChange={handleSliderChange}
                />
              }
              label="Brightness"
            />
            <FormControlLabel
              labelPlacement="top"
              control={
                <Slider
                  name={idBlur}
                  value={blurRadius}
                  step={0.1}
                  marks
                  min={0.0}
                  max={1.0}
                  valueLabelDisplay="auto"
                  valueLabelFormat={valueLabelFormat}
                  onChange={handleSliderChange}
                />
              }
              label="Blur"
            />
          </Stack>
          <Divider />
          <Stack spacing={2} paddingLeft={4} paddingRight={4}>
            <Typography variant="body1">Timings</Typography>
            <TextField
              fullWidth
              label="Change interval (5 minutes or more)"
              id={idIntervalTime}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={intervalValue}
              defaultValue={changeIntervalInMin}
              onChange={(e) => setIntervalValue(e.currentTarget.value)}
              onBlur={handleChange}
            />
            <TextField
              fullWidth
              label="Crossfade time"
              id={idCrossfadeTime}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">sec</InputAdornment>
                ),
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              defaultValue={crossfadeInSec}
              onChange={handleChange}
            />
          </Stack>
          <Divider />
          <Stack spacing={2} paddingLeft={4} paddingRight={4}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1">Select a Font</Typography>
              <FormControlLabel
                control={
                  <Switch
                    id={idFontOutline}
                    checked={isOutlined}
                    onChange={handleChange}
                  />
                }
                label="Outlined"
              />
            </Stack>
            <FontSelect value={font} onChange={setFont} />
          </Stack>
        </FormGroup>
      </DialogContent>
      <Version />
    </Drawer>
  )
}

export default Settings
