import { createTheme } from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#1976d2", // Blue color
    },
    secondary: {
      main: "#dc004e", // Pink color
    },
    background: {
      default: "#f4f6f8", // Light gray background
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  spacing: 8, // Base spacing unit for margins and padding
});

export default theme;
