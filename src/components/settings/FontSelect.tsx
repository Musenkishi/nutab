import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { FC } from "react"
import { Font, unquoteFontName } from "../../fonts"

type FontSelectProps = {
  value: Font | undefined
  onChange: (newFont: Font) => void
}

const FontSelect: FC<FontSelectProps> = (props) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.onChange(event.target.value as Font)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="font-select-label">Font</InputLabel>
      <Select
        labelId="font-select-label"
        id="font-select"
        value={props.value}
        label="Font"
        onChange={handleChange}
      >
        {Object.values(Font).map((font) => (
          <MenuItem key={font} value={font} sx={{ fontFamily: font }}>
            {unquoteFontName(font)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FontSelect
