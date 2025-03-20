import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../../../redux.ts";
import {
  IProductResponse,
  IStockResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import { IUserResponse } from "../../../../../services/types/UserInterface.tsx";
import { gray } from "../../../share-theme/themePrimitives.ts";
import { IPreviewRow } from "../../../../../redux/type.ts";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export interface IUsePreview {
  tableData: IPreviewRow;
}

export const usePreviewInvoice = (props: IUsePreview) => {
  const { user } = useAppSelector((state) => state.application);
  const calculateTotal = (numbers: number[]) => {
    return numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  };

  const receiptBlock3 = (pro: { title: string; value: string }) => {
    return (
      <Stack direction="row" gap={4}>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="end"
          fontWeight={600}
        >
          {pro.title}
        </Typography>
        <Typography
          variant="body2"
          textAlign="end"
          color="textSecondary"
          minWidth={80}
        >
          {pro.value}
        </Typography>
      </Stack>
    );
  };

  const previewReceipt = () => {
    return (
      <Stack p={2} maxWidth={600}>
        <Stack gap={3}>
          {/* block 1 */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Stack>
                <img
                  style={{
                    maxWidth: "30px",
                  }}
                  src={"/vite.svg"}
                  alt={"/vite.svg"}
                  loading="lazy"
                />
              </Stack>
              <Stack>
                <Typography variant="h5" component="div">
                  East Repair Inc.
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h6" component="div">
              RECEIPT
            </Typography>
          </Stack>
          {/* block 2 */}
          <Stack alignItems="flex-end">
            <Stack maxWidth={150}>
              <Typography variant="body2" color="textSecondary" textAlign="end">
                1912 Harvest Lane New York, NY 12210
              </Typography>
            </Stack>
          </Stack>
          {/* block 3 */}
          <br />
          <Stack direction="row" justifyContent="space-between">
            <Stack maxWidth={150}>
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={600}
              >
                Bill to
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user && `${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                2 Count Square New York, NY 12210
              </Typography>
            </Stack>
            <Stack maxWidth={150}>
              <Typography
                variant="body2"
                color="textSecondary"
                fontWeight={600}
              >
                Ship to
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {props.tableData.firstName} {props.tableData.lastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                3787 Pineview Drive Cambridge, MA 12210
              </Typography>
            </Stack>
            <Stack maxWidth={250} alignItems="end">
              <Stack direction="row" gap={4}>
                {receiptBlock3({ title: "Receipt #", value: "US-001" })}
              </Stack>
              <Stack direction="row" gap={4}>
                {receiptBlock3({ title: "Receipt Date", value: "11/02/2025" })}
              </Stack>
              <Stack direction="row" gap={4}>
                {receiptBlock3({ title: "P.O.#", value: "23/02/2025" })}
              </Stack>
              <Stack direction="row" gap={4}>
                {receiptBlock3({ title: "Due Date", value: "23/03/2025" })}
              </Stack>
            </Stack>
          </Stack>

          {/* block 4 */}
          <TableContainer>
            <Table
              size="small"
              sx={{ maxWidth: 584, borderCollapse: "collapse" }}
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow style={{ height: "20px" }}>
                  <TableCell
                    sx={{
                      bgcolor: "background.paper",
                      fontWeight: 600,
                      border: `2px solid ${gray[300]}`,
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "background.paper",
                      fontWeight: 600,
                      border: `2px solid ${gray[300]}`,
                    }}
                    align="right"
                  >
                    Qty.
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "background.paper",
                      fontWeight: 600,
                      border: `2px solid ${gray[300]}`,
                    }}
                    align="right"
                  >
                    Unit
                  </TableCell>
                  <TableCell
                    sx={{
                      bgcolor: "background.paper",
                      fontWeight: 600,
                      border: `2px solid ${gray[300]}`,
                    }}
                    align="right"
                  >
                    Sum
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.tableData.stocks.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell
                      sx={{
                        border: `2px solid ${gray[300]}`,
                        wordWrap: "break-word",
                        maxWidth: 150,
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: `2px solid ${gray[300]}`,
                      }}
                      align="right"
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: `2px solid ${gray[300]}`,
                      }}
                      align="right"
                    >
                      {row.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        border: `2px solid ${gray[300]}`,
                      }}
                      align="right"
                    >
                      {ccyFormat(row.price * row.quantity)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell
                    sx={{
                      border: `2px solid ${gray[300]}`,
                    }}
                    colSpan={2}
                  >
                    Subtotal
                  </TableCell>
                  <TableCell
                    sx={{
                      border: `2px solid ${gray[300]}`,
                    }}
                    align="right"
                  >
                    {ccyFormat(
                      calculateTotal(
                        props.tableData.stocks.flatMap(
                          (i) => i.price * i.quantity,
                        ),
                      ),
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    sx={{
                      border: `2px solid ${gray[300]}`,
                    }}
                    colSpan={2}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{
                      border: `2px solid ${gray[300]}`,
                    }}
                    align="right"
                  >
                    {ccyFormat(invoiceTotal)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    );
  };
  return { previewReceipt };
};
