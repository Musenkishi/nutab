import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  Collapse,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Icon,
  IconProps,
  ListItemButton,
  Slider,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { localStorageKeys } from "../../app/storage";
import previewSrc from "../../splash_settings_preview.jpg";

interface ExpandMoreProps extends IconProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <Icon {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type SettingsProps = {
  open: boolean;
  onClose?:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
};

const Settings: FunctionComponent<SettingsProps> = (props) => {
  const [keywordsStore, setKeywordsStore] = useLocalStorage(
    localStorageKeys.KEYWORDS,
    "green macro"
  );
  const [blurStore, setBlurStore] = useLocalStorage(
    localStorageKeys.BLUR_RADIUS,
    0.4
  );

  const [brightnessStore, setBrightnessStore] = useLocalStorage(
    localStorageKeys.BRIGHTNESS,
    1.0
  );

  const [keywordsText, setKeyWordsText] = useState(keywordsStore);

  const [blurSliderValue, setBlurSliderValue] = useState(blurStore);
  const [brightnessValue, setBrightnessValue] = useState(brightnessStore);
  const [expanded, setExpanded] = useState(false);

  const idKeywords = "idKeywords";
  const idBlur = "idBlur";
  const idBrightness = "idBrightness";

  const handleClose = () => {
    props.onClose && props.onClose("", "escapeKeyDown");
  };

  const handleSave = () => {
    setKeywordsStore(keywordsText);
    setBlurStore(blurSliderValue);
    setBrightnessStore(brightnessValue);
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case idKeywords:
        setKeyWordsText(event.target.value);
        break;
    }
  };

  const valueLabelFormat = (value: number) => {
    //Convert decimal to percent
    return value * 100 + " %";
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    switch (event.target.name) {
      case idBlur:
        setBlurSliderValue(newValue as number);
        break;
      case idBrightness:
        setBrightnessValue(newValue as number);
        break;
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
            defaultValue={keywordsText}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") handleSave();
            }}
          />
          <Divider />
          <Stack
            direction="row"
            sx={{
              backgroundColor: "",
            }}
          >
            <ListItemButton onClick={handleExpandClick}>
              <Typography variant="body1">Background effects</Typography>
              <ExpandMore
                expand={expanded}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </ListItemButton>
          </Stack>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Stack spacing={2} paddingLeft={4} paddingRight={4}>
              <Card
                sx={{
                  maxWidth: "15rem",
                  height: "15rem",
                  alignSelf: "center",
                }}
              >
                <CardHeader subheader="Preview" sx={{ padding: 1 }} />
                <CardMedia
                  component="img"
                  image={previewSrc}
                  alt="preview image for effects"
                  sx={{
                    filter:
                      "blur(" +
                      blurSliderValue +
                      "rem) brightness(" +
                      brightnessValue +
                      ")",
                  }}
                />
              </Card>
              <FormControlLabel
                labelPlacement="top"
                control={
                  <Slider
                    name={idBrightness}
                    value={brightnessValue}
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
                    value={blurSliderValue}
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
          </Collapse>
        </FormGroup>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions> */}
    </Drawer>
  );
};

export default Settings;
