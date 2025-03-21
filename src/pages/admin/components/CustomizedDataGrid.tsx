import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { DataGridProps } from "@mui/x-data-grid/models/props/DataGridProps";
import { ICart } from "../../../services/types/CartInterface.tsx";
import { IOrder } from "../../../services/types/OrderInterface.tsx";
import { IProduct } from "../../../services/types/ProductInterface";
import { IUser } from "../../../services/types/UserInterface.tsx";
import { IItem } from "../../../services/types/ItemInterface.tsx";

interface ICustomizedDataGridProps<
  T extends IProduct | ICart | IUser | IOrder | IItem,
> extends DataGridProps {
  rows: readonly GridValidRowModel[];
  columns: GridColDef[];
  pageSize: number;
  page: number;
  data: T | undefined;
  onPaginationModelChange: (
    model: GridPaginationModel,
    _: GridCallbackDetails<"pagination">,
  ) => void;
}

export default function CustomizedDataGrid<
  T extends IProduct | ICart | IUser | IOrder | IItem,
>(props: Readonly<ICustomizedDataGridProps<T>>) {
  const {
    columns,
    rows,
    pageSize,
    page,
    onPaginationModelChange,
    data,
    ...rest
  } = props;
  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
      }
      rowCount={data?.meta.totalItems}
      initialState={{
        pagination: {
          paginationModel: { pageSize, page: page - 1 },
        },
      }}
      pageSizeOptions={[10, 20, 50]}
      onPaginationModelChange={(e, meta) =>
        onPaginationModelChange({ ...e }, meta)
      }
      disableColumnResize
      density="compact"
      paginationMode="server"
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: "outlined",
              size: "small",
            },
            columnInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            operatorInputProps: {
              variant: "outlined",
              size: "small",
              sx: { mt: "auto" },
            },
            valueInputProps: {
              InputComponentProps: {
                variant: "outlined",
                size: "small",
              },
            },
          },
        },
      }}
      {...rest}
    />
  );
}
