import { Button, Stack, Typography, Box, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import SettingsAccessibilityOutlinedIcon from "@mui/icons-material/SettingsAccessibilityOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const mainListItems = [
  {
    text: "General",
    icon: <DisplaySettingsOutlinedIcon />,
    path: "/general",
  },
  {
    text: "Preference",
    icon: <SettingsAccessibilityOutlinedIcon />,
    path: "/preference",
  },
  {
    text: "Notifications",
    icon: <NotificationsNoneOutlinedIcon />,
    path: "/notifications",
  },
  {
    text: "Account",
    icon: <AdminPanelSettingsOutlinedIcon />,
    path: "/account",
  },
  {
    text: "User permissions",
    icon: <PeopleAltOutlinedIcon />,
    path: "/user-permissions",
  },
];

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string): void => {
    navigate(`/admin/settings${path}`);
  };

  useEffect(() => {
    if (location.pathname === "/admin/settings") {
      navigate("/admin/settings/general");
    }
  }, [location, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Stack gap={1}>
          <Typography variant="h3" fontWeight={600}>
            Settings
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Customize until match to your workflows
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // startIcon={<AddRoundedIcon />}
            // onClick={() => navigate("/admin/products/create")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // onClick={() => navigate("/admin/products/create")}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <br />
      <Stack
        direction="row"
        sx={{
          p: 1,
          gap: 1,
        }}
      >
        <List
          dense
          sx={{
            minWidth: "300px",
          }}
        >
          {mainListItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={location.pathname.includes(
                  `/admin/settings${item.path}`,
                )}
                onClick={() => handleNavigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider orientation="vertical" flexItem />
        <Stack p={1.5} gap={1} flexGrow={1}>
          <Outlet />
        </Stack>
        {/*<List dense>*/}
        {/*  {secondaryListItems.map((item, index) => (*/}
        {/*    <ListItem key={index} disablePadding sx={{ display: "block" }}>*/}
        {/*      <ListItemButton*/}
        {/*        selected={location.pathname.includes(`/admin${item.path}`)}*/}
        {/*        onClick={() => handleNavigate(item.path)}*/}
        {/*      >*/}
        {/*        <ListItemIcon>{item.icon}</ListItemIcon>*/}
        {/*        <ListItemText primary={item.text} />*/}
        {/*      </ListItemButton>*/}
        {/*    </ListItem>*/}
        {/*  ))}*/}
        {/*</List>*/}
      </Stack>
    </Box>
  );
};

export default Settings;
