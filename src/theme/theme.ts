import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#264653",
    // },
    // secondary: {
    //   main: "#e76f51",
    // },
    mode: "dark",
  },
  typography: {
    fontFamily: "Nunito",
    h1: {
      fontSize: "9rem",
    },
  },
});

export default theme;
