import { Box, Stack } from "@mui/material";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import CssBaseline from "@mui/material/CssBaseline";
import { alpha } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import AppTheme from "../../admin/AdminTheme.tsx";
import { chartsCustomizations } from "../../admin/theme/charts.ts";
import { dataGridCustomizations } from "../../admin/theme/dataGrid.ts";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
};

const AppPublicLayout = (props: { disableCustomTheme?: boolean }) => {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
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
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default AppPublicLayout;
