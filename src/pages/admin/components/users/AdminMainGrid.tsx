import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux.ts";
import { dispatchProductCurrentPage } from "../../../../redux/application.ts";
import { useGetAllUsersQuery } from "../../../../services/adminApi.ts";
import {
  IUser,
  IUserDataGrid,
} from "../../../../services/types/UserInterface.tsx";
import { userColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";

const AdminMainGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(search.get("page") ?? 1);
  const [limit, setLimit] = useState(search.get("limit") ?? 20);
  const { data, isLoading, isFetching } = useGetAllUsersQuery(
    {
      limit: Number(limit),
      page: Number(page),
      role: 'ADMIN'
    },
    { refetchOnMountOrArgChange: true },
  );
  const [users, setUser] = useState<IUserDataGrid[]>([]);

  const onPaginationModelChange = (
    model: GridPaginationModel,
    _: GridCallbackDetails<"pagination">,
  ) => {
    setLimit(model.pageSize);
    setPage(model.page + 1);
    search.set("page", (model.page + 1).toString());
    search.set("limit", model.pageSize.toString());
    setSearchParam(search);
    dispatch(dispatchProductCurrentPage(model.page + 1));
  };

  useEffect(() => {
    if (data) {
      const remap: IUserDataGrid[] = data.data.map((d) => ({
        id: d.id,
        userFirstName: d.firstName,
        userLastName: d.lastName,
        userEmail: d.email,
        userPhone: d.phone,
        userProfile: d.profile,
        userPublicId: d.publicId,
        userUsername: d.username,
        userCreatedDate: d.createdAt,
        userUpdatedDate: d.updatedAt,
      }));
      setUser(remap);
    }
  }, [data, limit, page]);

  if (isLoading || isFetching) {
    return <>loading...</>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Users
      </Typography>
      <Stack direction="row" pb={1}>
        <Button
          variant="contained"
          size="small"
          sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate("/admin/people/create")}
        >
          Create new
        </Button>
      </Stack>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<IUser>
            data={data}
            pageSize={Number(limit)}
            page={Number(page)}
            columns={userColumns}
            rows={users}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminMainGrid;
