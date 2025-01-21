import { Box, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import theme from "../../../theme.tsx";

const AppPublicLayout = () => {
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
        <Box
          sx={{
            maxWidth: "1080px",
            width: "100%",
          }}
        >
          <br />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppPublicLayout;
