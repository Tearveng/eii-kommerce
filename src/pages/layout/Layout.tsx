import { Box, Container } from "@mui/material";
import AppHeader from "./Header";
import AppContent from "./Content";
import AppFooter from "./Footer";

const AppLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppHeader />
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: "1920px",
          border: "1px solid red",
        }}
      >
        <AppContent />
        <AppFooter />
      </Container>
    </Box>
  );
};

export default AppLayout;
