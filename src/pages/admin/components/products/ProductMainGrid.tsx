import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CustomizedDataGrid from "../CustomizedDataGrid.tsx";
import { useGetAllProductsQuery } from "../../../../services/productApi.ts";
import { useEffect, useState } from "react";
import { IProductDataGrid } from "../../../../services/types/ProductInterface.tsx";
import { productColumns } from "../../internals/data/gridData.tsx";

const ProductMainGrid = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const { data, isLoading, isFetching, isSuccess } = useGetAllProductsQuery({
    limit,
    page,
  });

  const [products, setProducts] = useState<IProductDataGrid[]>([]);

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
  }, [data]);

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
        Products
      </Typography>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid columns={productColumns} rows={products} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductMainGrid;
