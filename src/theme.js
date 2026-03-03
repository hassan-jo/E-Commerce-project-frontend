import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light"
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          colorScheme: "light"
        },
        body: {
          colorScheme: "light",
          backgroundColor: "#ffffff"
        }
      }
    }
  }
});

export default theme;