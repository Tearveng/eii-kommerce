import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useGetOrdersSummaryQuery,
} from "../../../../services/orderApi.ts";
import {
  IOrder,
  IOrderDataGrid,
} from "../../../../services/types/OrderInterface.tsx";
import { orderColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import ConsumeData from "../../../../components/ConsumeData.tsx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useDatePicker } from "../../../../hooks/useDatePicker.tsx";
import { useSearchInput } from "../../../../hooks/useSearchInput.tsx";
import { useSelectTable } from "../../../../hooks/useSelectTable.tsx";

const OrderMainGrid = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { startDateJSX, endDateJSX } = useDatePicker();
  const { searchJsx } = useSearchInput();
  const { selectCurrencyJSX, selectStatusJSX } = useSelectTable();
  const { data, isLoading, isFetching } = useGetAllOrdersQuery({
    limit,
    page,
  });
  const {
    data: orderSummary,
    isLoading: summaryLoading,
    isFetching: summaryFetching,
  } = useGetOrdersSummaryQuery();

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
        items: d.items,
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

  if (isLoading || isFetching || summaryLoading || summaryFetching) {
    return <>loading...</>;
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      {/* consume data */}
      {data && orderSummary && (
        <ConsumeData meta={data.meta} orderSummary={orderSummary} />
      )}

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

      <Stack direction="row" gap={2} alignItems="center" mb={2}>
        <Stack>{startDateJSX()}</Stack>
        <CompareArrowsIcon sx={{ mt: 1 }} />
        <Stack>{endDateJSX()}</Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="end"
        justifyContent="space-between"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Stack direction="row" gap={2}>
          {selectCurrencyJSX()}
          {selectStatusJSX()}
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          {searchJsx()}
        </Stack>
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
