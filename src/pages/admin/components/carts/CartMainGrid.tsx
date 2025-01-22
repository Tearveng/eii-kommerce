import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../../services/productApi.ts";
import {
  IProduct,
  IProductDataGrid,
} from "../../../../services/types/ProductInterface.tsx";
import { productColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import { dispatchProductCurrentPage } from "../../../../redux/application.ts";
import { useAppDispatch } from "../../../../redux.ts";

const CartMainGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [search, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(search.get("page") ?? 1);
  const [limit, setLimit] = useState(search.get("limit") ?? 20);
  const {
    currentData: data,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({
    limit: Number(limit),
    page: Number(page),
  });
  const [products, setProducts] = useState<IProductDataGrid[]>([]);

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
      const remap: IProductDataGrid[] = data.data.map((d) => ({
        id: d.id,
        productName: d.name,
        productCode: d.code,
        productSkuCode: d.skuCode,
        productPrice: d.price,
        productQuantity: d.quantity,
        productThumbnail: d.thumbnail,
        productCreatedDate: d.createdAt,
        productUpdatedDate: d.updatedAt,
      }));
      setProducts(remap);
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
        Carts
      </Typography>
      {/*<Stack direction="row" pb={1}>*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    size="small"*/}
      {/*    sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}*/}
      {/*    startIcon={<AddRoundedIcon />}*/}
      {/*    onClick={() => navigate("/admin/products/create")}*/}
      {/*  >*/}
      {/*    Create new*/}
      {/*  </Button>*/}
      {/*</Stack>*/}
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<IProduct>
            data={data}
            pageSize={Number(limit)}
            page={Number(page)}
            columns={productColumns}
            rows={products}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartMainGrid;
