import { Box, ThemeProvider } from "@mui/material";
import AppHeader from "./Header.tsx";
import AppContent from "./Content.tsx";
import AppFooter from "./Footer.tsx";
import theme from "../../../theme.tsx";

const AppLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          alignItems: "center",
        }}
      >
        <AppHeader />
        <Box
          sx={{
            maxWidth: "1080px",
            width: "100%",
          }}
        >
          <br />
          <AppContent />
          <br />
          <br />
          <br />
          <AppFooter />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
