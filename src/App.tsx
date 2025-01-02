import { ThemeProvider } from "@mui/material";
import AppRouter from "./router";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
