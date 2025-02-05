import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../../../../services/productApi.ts";
import {
  IProduct,
  IProductDataGrid,
} from "../../../../services/types/ProductInterface.tsx";
import { productColumns } from "../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import { Button, Stack } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useNavigate } from "react-router-dom";

const OrderMainGrid = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    limit,
    page,
  });

  const [products, setProducts] = useState<IProductDataGrid[]>([]);

  const onPaginationModelChange = (
    model: GridPaginationModel,
    detail: GridCallbackDetails<"pagination">,
  ) => {
    setLimit(model.pageSize);
    setPage(model.page + 1);
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
          <CustomizedDataGrid<IProduct>
            data={data}
            pageSize={limit}
            page={page}
            columns={productColumns}
            rows={products}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderMainGrid;
