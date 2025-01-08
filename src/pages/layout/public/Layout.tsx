import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AppPublicLayout = () => {
  return (
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
  );
};

export default AppPublicLayout;
