import { Box, Stack } from "@mui/material";
import SideMenu from "../../admin/components/SideMenu.tsx";
import AppNavbar from "../../admin/components/AppNavBar.tsx";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../AdminTheme.tsx";
import { chartsCustomizations } from "../theme/charts.ts";
import { dataGridCustomizations } from "../theme/dataGrid.ts";
import { alpha } from "@mui/material/styles";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
};

const AdminLayout = (props: { disableCustomTheme?: boolean }) => {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default AdminLayout;
