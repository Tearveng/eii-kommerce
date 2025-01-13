import { Box } from "@mui/material";
import AppHeader from "./Header";
import AppContent from "./Content";
import AppFooter from "./Footer";

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
