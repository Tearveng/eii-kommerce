import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../../redux.ts";
import { dispatchProductCurrentPage } from "../../../../../redux/application.ts";
import { useGetAllStocksQuery } from "../../../../../services/stockApi.ts";
import {
  IStock,
  IStockDataGrid,
} from "../../../../../services/types/ProductInterface.tsx";
import { StockType } from "../../../../../utils/constant.ts";
import { stockColumns } from "../../../internals/data/gridData.tsx";
import CustomizedDataGrid from "../../CustomizedDataGrid.tsx";

const lastPathName = (pathname: string) => {
  const splitPathname = pathname.split("/");
  const lastPathname = splitPathname[splitPathname.length - 1];

  return lastPathname;
};

const mapPathName = (pathname: string): StockType => {
  const path = lastPathName(pathname);
  const type = {
    ["stock"]: StockType.STOCK,
    ["pre-stock"]: StockType.PRE_STOCK,
    ["live"]: StockType.LIVE,
  };

  return type[path] ?? StockType.STOCK;
};

export const titleName = (pathname: string): StockType => {
  const path = lastPathName(pathname);
  const type = {
    ["stock"]: "Stock",
    ["pre-stock"]: "Pre stock",
    ["live"]: "Live",
  };

  return type[path] ?? "Stock";
};

// eslint-disable-next-line react-refresh/only-export-components
export const mapPathType = (type: StockType) => {
  const pathType = {
    [StockType.STOCK]: "stock",
    [StockType.PRE_STOCK]: "pre-stock",
    [StockType.LIVE]: "live",
  };

  return pathType[type];
};

const StockMainGrid = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const typePath = mapPathName(location.pathname);
  const [search, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(search.get("page") ?? 1);
  const [limit, setLimit] = useState(search.get("limit") ?? 20);
  const {
    currentData: data,
    isLoading,
    isFetching,
  } = useGetAllStocksQuery({
    limit: Number(limit),
    page: Number(page),
    type: typePath,
  });
  const [stocks, setStocks] = useState<IStockDataGrid[]>([]);

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
      const remap: IStockDataGrid[] = data.data.map((d) => ({
        id: d.id,
        productName: d.name,
        productType: d.type,
        productDescription: d.description,
        productCode: d.code,
        productSkuCode: d.skuCode,
        productPrice: d.price,
        productQuantity: d.quantity,
        productThumbnail: d.thumbnail,
        productCreatedDate: d.createdAt,
        productUpdatedDate: d.updatedAt,
      }));
      setStocks(remap);
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
        {titleName(location.pathname)}
      </Typography>
      <Stack direction="row" pb={1}>
        <Button
          variant="contained"
          size="small"
          sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            navigate(
              `/admin/products/${lastPathName(location.pathname)}/create${window.location.search}`,
            )
          }
        >
          Add stock
        </Button>
      </Stack>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <CustomizedDataGrid<IStock>
            data={data}
            pageSize={Number(limit)}
            page={Number(page)}
            columns={stockColumns}
            rows={stocks}
            onPaginationModelChange={onPaginationModelChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StockMainGrid;
