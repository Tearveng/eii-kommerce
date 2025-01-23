import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cartColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import { dispatchProductCurrentPage } from "../../../../redux/application.ts";
import { useAppDispatch } from "../../../../redux.ts";
import { useGetAllCartsQuery } from "../../../../services/cartApi.ts";
import {
  ICart,
  ICartDataGrid,
} from "../../../../services/types/CartInterface.tsx";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Stack, TextField } from "@mui/material";

const ItemMainGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(search.get("page") ?? 1);
  const [limit, setLimit] = useState(search.get("limit") ?? 20);
  const {
    currentData: data,
    isLoading,
    isFetching,
  } = useGetAllCartsQuery({
    limit: Number(limit),
    page: Number(page),
  });
  const [carts, setCarts] = useState<ICartDataGrid[]>([]);

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
      const remap: ICartDataGrid[] = data.data.map((d) => ({
        id: d.cartId,
        user: d.user.username,
        cartSubtotal: d.subtotal,
        cartTax: d.tax,
        cartShippingCost: d.shippingCost,
        cartTotalPrice: d.totalPrice,
        cartCurrency: d.currency,
        cartCouponCode: d.couponCode ?? "-",
        cartDiscountApplied: d.discountsApplied ?? "-",
        cartIsSavedForLater: d.isSavedForLater,
        cartCreatedDate: d.createdAt,
        cartUpdatedDate: d.updatedAt,
      }));
      setCarts(remap);
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
        Items
      </Typography>
      <Stack direction="row" alignItems="center" gap={1}>
        <SearchRoundedIcon />
        <TextField type="search" size="small" placeholder="Search" />
      </Stack>

      <Grid container spacing={2} columns={12} mt={2}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<ICart>
            data={data}
            pageSize={Number(limit)}
            page={Number(page)}
            columns={cartColumns}
            rows={carts}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemMainGrid;
