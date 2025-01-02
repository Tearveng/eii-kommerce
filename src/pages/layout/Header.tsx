import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import AppProfile from "../../components/Profile";

const menuItems = ["Home", "About", "Services", "Contact"];

const AppHeader = () => {
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        width: "100%", // Ensure AppBar spans full width
        maxWidth: "1080px", // Lock max width for the AppBar
        margin: "0 auto", // Center the AppBar
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" color="black">
          App
        </Typography>

        {/* Desktop Menu: Buttons for each menu item */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {menuItems.map((item) => (
            <Button key={item} sx={{ color: "black", textTransform: "none" }}>
              {item}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <SearchInput /> */}
          <AppProfile />
        </Box>

        {/* Mobile Menu: Menu Icon */}
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={() => toggleDrawer(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
