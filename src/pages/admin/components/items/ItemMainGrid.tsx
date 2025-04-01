import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { itemColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import { dispatchProductCurrentPage } from "../../../../redux/application.ts";
import { useAppDispatch } from "../../../../redux.ts";
import { Stack } from "@mui/material";
import { useGetAllItemsQuery } from "../../../../services/itemApi.ts";
import {
  IItem,
  IItemDataGrid,
} from "../../../../services/types/ItemInterface.tsx";
import { useDatePicker } from "../../../../hooks/useDatePicker.tsx";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useSearchInput } from "../../../../hooks/useSearchInput.tsx";

const ItemMainGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(search.get("page") ?? 1);
  const [limit, setLimit] = useState(search.get("limit") ?? 20);
  const { searchJsx } = useSearchInput();
  const {
    currentData: data,
    isLoading,
    isFetching,
  } = useGetAllItemsQuery({
    limit: Number(limit),
    page: Number(page),
  });
  const [items, setItems] = useState<IItemDataGrid[]>([]);
  const { startDateJSX, endDateJSX } = useDatePicker();

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
      const remap: IItemDataGrid[] = data.data.map((d) => ({
        id: d.itemId,
        client: d.client,
        profile: d.profile,
        clientId: d.clientId,
        itemId: d.itemId,
        profileId: d.profileId,
        isInStock: d.isInStock,
        productCode: d.productCode,
        productUrl: d.productUrl,
        stockUrl: d.stockUrl,
        stockSkuCode: d.sku,
        variant: d.variant,
        itemDiscount: d.discount,
        itemName: d.name,
        itemPrice: d.price,
        itemQuantity: d.quantity,
        itemSubtotal: d.subtotal,
        itemTax: d.tax,
        itemTotalPrice: d.totalPrice,
        itemCreatedDate: d.createdAt,
        itemUpdatedDate: d.updatedAt,
      }));
      console.log("remap", remap);
      setItems(remap);
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

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={2} alignItems="center">
          <Stack>{startDateJSX()}</Stack>
          <CompareArrowsIcon sx={{ mt: 1 }} />
          <Stack>{endDateJSX()}</Stack>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          {searchJsx()}
        </Stack>
      </Stack>
      <Grid container spacing={2} columns={12} mt={2}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<IItem>
            data={data}
            pageSize={Number(limit)}
            page={Number(page)}
            columns={itemColumns}
            rows={items}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemMainGrid;
