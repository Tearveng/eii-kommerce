import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { StockType } from "../../../../../utils/constant";

export const useSelectProductType = () => {
    const [select, setSelect] = useState<StockType>(StockType.STOCK);

    const handleChange = (e: SelectChangeEvent<StockType>) => {
        setSelect(e.target.value as StockType)
    }

    const selectTypeJSX = () => {
        return <Select value={select} onChange={handleChange}><MenuItem>ASASD</MenuItem></Select>
    }

    return { select, selectTypeJSX }
}