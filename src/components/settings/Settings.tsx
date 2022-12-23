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
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FocusEvent, FunctionComponent, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { defaultStorageValues, LOCALSTORAGE_KEYS } from "../../app/storage";

type SettingsProps = {
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
};

const Settings: FunctionComponent<SettingsProps> = (props) => {
  const [keywordsStore, setKeywordsStore] = useLocalStorage(
    LOCALSTORAGE_KEYS.KEYWORDS,
    defaultStorageValues.KEYWORDS
  );
  const [blurStore, setBlurStore] = useLocalStorage(
    LOCALSTORAGE_KEYS.BLUR_RADIUS,
    defaultStorageValues.BLUR_RADIUS
  );

  const [brightnessStore, setBrightnessStore] = useLocalStorage(
    LOCALSTORAGE_KEYS.BRIGHTNESS,
    defaultStorageValues.BRIGHTNESS
  );

  const [changeInterval, setChangeInterval] = useLocalStorage(
    LOCALSTORAGE_KEYS.CHANGE_INTERVAL_SEC,
    defaultStorageValues.CHANGE_INTERVAL_SEC
  );

  const [intervalValue, setIntervalValue] = useState<string | number>(
    changeInterval
  );

  const [crossfadeInSec, setCrossfadeInSec] = useLocalStorage(
    LOCALSTORAGE_KEYS.CROSSFADE_TIME,
    defaultStorageValues.CROSSFADE_TIME
  );

  const idKeywords = "idKeywords";
  const idBlur = "idBlur";
  const idBrightness = "idBrightness";
  const idIntervalTime = "idIntervalTime";
  const idCrossfadeTime = "idCrossfadeTime";

  const handleClose = () => {
    props.onClose && props.onClose("", "escapeKeyDown");
  };

  const ensureNumber = (value: string): number => {
    const numberValue = Number.parseInt(value.replace(/\D/g, ""));
    return Number.isNaN(numberValue) ? 0 : numberValue;
  };

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement>
      | FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    switch (event.target.id) {
      case idKeywords:
        setKeywordsStore(event.target.value);
        break;
      case idIntervalTime:
        const onlyNumbers = ensureNumber(event.currentTarget.value);
        const ensure5MinutesOrGreater = onlyNumbers > 5 ? onlyNumbers : 5;
        setChangeInterval(ensure5MinutesOrGreater);
        setIntervalValue(ensure5MinutesOrGreater);
        break;
      case idCrossfadeTime:
        setCrossfadeInSec(ensureNumber(event.currentTarget.value));
        break;
    }
  };

  const valueLabelFormat = (value: number) => {
    //Convert decimal to percent
    return value * 100 + " %";
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const value = newValue as number;
    switch (event.target.name) {
      case idBlur:
        setBlurStore(value);
        break;
      case idBrightness:
        setBrightnessStore(value);
        break;
    }
  };

  return (
    <Drawer
      BackdropProps={{ invisible: true }}
      anchor="right"
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>Settings</DialogTitle>
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
            defaultValue={keywordsStore}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") handleClose();
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
                  value={brightnessStore}
                  step={0.1}
                  marks
                  min={0.0}
                  max={1.0}
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
                  value={blurStore}
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
              label="Change interval (5 minutes or greater)"
              id={idIntervalTime}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              value={intervalValue}
              defaultValue={changeInterval}
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
        </FormGroup>
      </DialogContent>
    </Drawer>
  );
};

export default Settings;
