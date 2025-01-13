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
import HeaderCart from "../../../components/HeaderCart";
import HeaderProfile from "../../../components/HeaderProfile";
import { useNavigate } from "react-router-dom";

const menuItems = ["Home", "About", "Services", "Contact"];

const AppHeader = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
        width: "100%",
        maxWidth: "1080px",
        margin: "0 auto",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          color="black"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
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
          <HeaderCart />
          <HeaderProfile />
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
