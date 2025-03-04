import { Box, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { alpha } from "@mui/material/styles";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { Navigate, Outlet } from "react-router-dom";
import AppNavbar from "../../admin/components/AppNavBar.tsx";
import SideMenu from "../../admin/components/SideMenu.tsx";
import AppTheme from "../AdminTheme.tsx";
import ProductDeleteDialog from "../components/products/dialog/ProductDeleteDialog.tsx";
import UserDeleteDialog from "../components/users/dialog/UserDeleteDialog.tsx";
import { chartsCustomizations } from "../theme/charts.ts";
import { dataGridCustomizations } from "../theme/dataGrid.ts";
import Header from "./Header.tsx";
import { authService } from "../../../services/service/AuthService.ts";
import { useAuthWatcher } from "../../../hooks/useAuthWatcher.tsx";
import PreviewDialog from "../components/UI/PreviewDialog.tsx";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
};

const AdminLayout = (props: { disableCustomTheme?: boolean }) => {
  useAuthWatcher();
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

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

      <ProductDeleteDialog />
      <UserDeleteDialog />
      <PreviewDialog />
    </AppTheme>
  );
};

export default AdminLayout;
