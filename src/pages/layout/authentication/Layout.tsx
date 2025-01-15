import { Box } from "@mui/material";
import AppHeader from "./Header.tsx";
import AppContent from "./Content.tsx";
import AppFooter from "./Footer.tsx";

const AppLayout = () => {
  return (
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
  );
};

export default AppLayout;
