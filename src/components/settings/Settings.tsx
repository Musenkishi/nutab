import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { useLocalStorage } from "usehooks-ts";
import { defaultStorageValues, localStorageKeys } from "../../app/storage";

type SettingsProps = {
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
};

const Settings: FunctionComponent<SettingsProps> = (props) => {
  const [keywordsStore, setKeywordsStore] = useLocalStorage(
    localStorageKeys.KEYWORDS,
    defaultStorageValues.KEYWORDS
  );
  const [blurStore, setBlurStore] = useLocalStorage(
    localStorageKeys.BLUR_RADIUS,
    defaultStorageValues.BLUR_RADIUS
  );

  const [brightnessStore, setBrightnessStore] = useLocalStorage(
    localStorageKeys.BRIGHTNESS,
    defaultStorageValues.BRIGHTNESS
  );

  const idKeywords = "idKeywords";
  const idBlur = "idBlur";
  const idBrightness = "idBrightness";

  const handleClose = () => {
    props.onClose && props.onClose("", "escapeKeyDown");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case idKeywords:
        setKeywordsStore(event.target.value);
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
        </FormGroup>
      </DialogContent>
    </Drawer>
  );
};

export default Settings;
