import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import { Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { MouseEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/home", children: [] },
  {
    text: "Products",
    icon: <Inventory2RoundedIcon />,
    path: "/products",
    children: [
      {
        text: "Stock",
        icon: <Inventory2Icon />,
        path: "/products/stock",
      },
      {
        text: "Pre-stock",
        icon: <BookmarkAddedIcon />,
        path: "/products/pre-stock",
      },
      {
        text: "Live",
        icon: <ShowChartIcon />,
        path: "/products/live",
      },
    ],
  },
  {
    text: "Items",
    icon: <CategoryRoundedIcon />,
    path: "/items",
    children: [],
  },
  {
    text: "Orders",
    icon: <InventoryRoundedIcon />,
    path: "/orders",
    children: [
      { text: "Deposit", icon: <StoreRoundedIcon />, path: "/orders/deposit" },
      {
        text: "Purchase",
        icon: <LocalAtmRoundedIcon />,
        path: "/orders/create",
      },
    ],
  },
  {
    text: "Sales",
    icon: <AttachMoneyIcon />,
    path: "/sales",
    children: [
      {
        text: "Preorder",
        icon: <BookmarkAddedIcon />,
        path: "/sales/preorder",
      },
      {
        text: "Stock",
        icon: <Inventory2Icon />,
        path: "/sales/stock",
      },
      {
        text: "Live",
        icon: <ShowChartIcon />,
        path: "/sales/live",
      },
    ],
  },
  {
    text: "Report",
    icon: <AnalyticsRoundedIcon />,
    path: "/report",
    children: [
      {
        text: "Preorder",
        icon: <BookmarkAddedIcon />,
        path: "/sales/preorder",
      },
    ],
  },
  {
    text: "Cart",
    icon: <ShoppingCartRoundedIcon />,
    path: "/carts",
    children: [],
  },
  // {
  //   text: "Analytics",
  //   icon: <AnalyticsRoundedIcon />,
  //   path: "/analytics",
  //   children: [],
  // },
  {
    text: "Users",
    icon: <PeopleRoundedIcon />,
    path: "/people",
    children: [
      { text: "Admin", icon: <AdminPanelSettingsRoundedIcon />, path: "/people/admin?role=ADMIN" },
      {
        text: "User",
        icon: <SupervisedUserCircleRoundedIcon />,
        path: "/people/user?role=USER",
      },
      {
        text: "Client",
        icon: <PersonOutlineRoundedIcon />,
        path: "/people/client?role=CLIENT",
      },
    ],
  },
  {
    text: "Tasks",
    icon: <AssignmentRoundedIcon />,
    path: "/tasks",
    children: [],
  },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" },
  { text: "About", icon: <InfoRoundedIcon />, path: "/about" },
  { text: "Feedback", icon: <HelpRoundedIcon />, path: "/feedback" },
];

const MenuContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(
    Array.from({ length: mainListItems.length }, () => false),
  );

  const handleNavigate = (path: string): void => {
    navigate(`/admin${path}`);
  };

  const handleClickExpand = (
    event: MouseEvent<SVGSVGElement>,
    index: number,
  ) => {
    event.stopPropagation();
    const cpExpanded = [...expanded];
    cpExpanded[index] = !cpExpanded[index];
    setExpanded(cpExpanded);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => {
          if (item.children.length > 0) {
            return (
              <Box key={index}>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    selected={location.pathname.includes(`/admin${item.path}`)}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {expanded[index] ? (
                      <ExpandLess
                        onClick={(e) => handleClickExpand(e, index)}
                      />
                    ) : (
                      <ExpandMore
                        onClick={(e) => handleClickExpand(e, index)}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                {expanded[index] && (
                  <List dense>
                    {item.children.map((i, idx) => {
                      return (
                        <ListItem
                          key={idx}
                          disablePadding
                          sx={{ display: "block" }}
                        >
                          <ListItemButton
                            selected={location.pathname.includes(
                              `/admin${i.path.split('?')[0]}`,
                            )}
                            onClick={() => handleNavigate(i.path)}
                          >
                            <ListItemIcon>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.text} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                )}
              </Box>
            );
          } else {
            return (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  selected={location.pathname.includes(`/admin${item.path}`)}
                  onClick={() => handleNavigate(item.path)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          }
        })}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
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
    </Stack>
  );
};

export default MenuContent;
