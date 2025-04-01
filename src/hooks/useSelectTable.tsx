import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ORDER_STATUS } from "../utils/constant.ts";

export const useSelectTable = () => {
  const [currency, setCurrency] = useState("USD");
  const [status, setStatus] = useState<Omit<ORDER_STATUS, "">>("ALL");

  const handleChangeCurrency = (e: SelectChangeEvent<string>) => {
    setCurrency(e.target.value);
  };

  const handleChangeStatus = (e: SelectChangeEvent<string>) => {
    setStatus(e.target.value);
  };

  const selectCurrencyJSX = () => {
    return (
      <Select
        id="select-currency"
        size="small"
        value={currency}
        sx={{ minWidth: 200, height: "30px" }}
        onChange={handleChangeCurrency}
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="KH">KH</MenuItem>
      </Select>
    );
  };

  const selectStatusJSX = () => {
    return (
      <Select
        id="select-status"
        size="small"
        value={status as string}
        sx={{ minWidth: 200, height: "30px" }}
        onChange={handleChangeStatus}
      >
        <MenuItem value={"ALL"}>ALL</MenuItem>
        <MenuItem value={ORDER_STATUS.DONE}>{ORDER_STATUS.DONE}</MenuItem>
        <MenuItem value={ORDER_STATUS.PENDING}>{ORDER_STATUS.PENDING}</MenuItem>
        <MenuItem value={ORDER_STATUS.PAID}>{ORDER_STATUS.PAID}</MenuItem>
        <MenuItem value={ORDER_STATUS.RETURN}>{ORDER_STATUS.RETURN}</MenuItem>
      </Select>
    );
  };

  return { selectCurrencyJSX, selectStatusJSX };
};
