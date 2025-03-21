import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../../../services/orderApi.ts";
import {
  IOrder,
  IOrderDataGrid,
} from "../../../../services/types/OrderInterface.tsx";
import { orderColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";

const OrderMainGrid = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isFetching } = useGetAllOrdersQuery({
    limit,
    page,
  });

  const [orders, setOrders] = useState<IOrderDataGrid[]>([]);
  const onPaginationModelChange = (
    model: GridPaginationModel,
    detail: GridCallbackDetails<"pagination">,
  ) => {
    setLimit(model.pageSize);
    setPage(model.page + 1);
  };

  useEffect(() => {
    if (data) {
      const remap: IOrderDataGrid[] = data.data.map((d) => ({
        id: d.id,
        client: d.client,
        profile: d.profile,
        clientId: d.clientId,
        profileId: d.profileId,
        couponCode: d.couponCode,
        currency: d.currency,
        discount: d.discount,
        status: d.status,
        refererCode: d.refererCode,
        orderSubtotal: d.subtotal,
        orderTotal: d.total,
        orderTotalPrice: d.totalPrice,
        orderCreatedDate: d.createdAt,
        orderUpdatedDate: d.updatedAt,
      }));
      setOrders(remap);
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
        Orders
      </Typography>
      <Stack direction="row" pb={1}>
        <Button
          variant="contained"
          size="small"
          sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
          startIcon={<AddRoundedIcon />}
          onClick={() => navigate("/admin/orders/create")}
        >
          Create new
        </Button>
      </Stack>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<IOrder>
            data={data}
            pageSize={limit}
            page={page}
            columns={orderColumns}
            rows={orders}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderMainGrid;
