import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#14b8a6",
    },
    secondary: {
      main: "#475569",
    },
  },

  fontFamily: ["Roboto", "sans-serif"].join(","),
});

export default theme;
