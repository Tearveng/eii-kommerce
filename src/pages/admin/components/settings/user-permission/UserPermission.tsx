import { Checkbox, Divider, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../../CustomizedDataGrid.tsx";
import {
  IProduct,
  IProductDataGrid,
} from "../../../../../services/types/ProductInterface.tsx";
import { userPermissionColumns } from "../../../internals/data/gridData.tsx";
import { useState } from "react";

const data = {
  data: [],
  meta: {
    totalItems: 0,
  },
};

const UserPermission = () => {
  const [userPermissions, setUserPermissions] = useState<any[]>([
    {
      id: "1",
      actions: "1",
    },
  ]);

  return (
    <Stack gap={2} width="100%">
      <Stack gap={1}>
        <Typography variant="h4" fontWeight={600}>
          User Permissions
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Manage who has access in your system
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Stack gap={4}>
          <Grid container spacing={2} columns={12}>
            <Grid size={{ xs: 12, lg: 12 }}></Grid>
          </Grid>

          {/*<Typography variant="h5" fontWeight={600}>*/}
          {/*  User*/}
          {/*</Typography>*/}
          {/*/!*  products  *!/*/}
          {/*<Stack direction="row" alignItems="center" gap={4}>*/}
          {/*  <Typography variant="body1" fontWeight={600} minWidth={100}>*/}
          {/*    View:*/}
          {/*  </Typography>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">View</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Create</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Update</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Delete</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*</Stack>*/}

          {/*/!*  orders  *!/*/}
          {/*<Stack direction="row" alignItems="center" gap={4}>*/}
          {/*  <Typography variant="body1" fontWeight={600} minWidth={100}>*/}
          {/*    Orders:*/}
          {/*  </Typography>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">View</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Create</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Update</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Delete</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*</Stack>*/}

          {/*/!*  carts  *!/*/}
          {/*<Stack direction="row" alignItems="center" gap={4}>*/}
          {/*  <Typography variant="body1" fontWeight={600} minWidth={100}>*/}
          {/*    Carts:*/}
          {/*  </Typography>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">View</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Create</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Update</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*  <Stack direction="row" alignItems="center" gap={1}>*/}
          {/*    <Checkbox defaultChecked sx={{ m: 0 }} />*/}
          {/*    <Stack mt={0.3}>*/}
          {/*      <Typography variant="body2">Delete</Typography>*/}
          {/*    </Stack>*/}
          {/*  </Stack>*/}
          {/*</Stack>*/}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default UserPermission;
