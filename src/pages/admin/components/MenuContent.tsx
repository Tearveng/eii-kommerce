import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/home" },
  { text: "Products", icon: <CategoryRoundedIcon />, path: "/products" },
  { text: "Orders", icon: <InventoryRoundedIcon />, path: "/orders" },
  { text: "Analytics", icon: <AnalyticsRoundedIcon />, path: "/analytics" },
  { text: "Clients", icon: <PeopleRoundedIcon />, path: "/people" },
  { text: "Tasks", icon: <AssignmentRoundedIcon />, path: "/tasks" },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

const MenuContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(`/admin${path}`);
  };
  console.log("location.pathname", location.pathname);
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={location.pathname.includes(`/admin${item.path}`)}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
