import {
  Autocomplete,
  Box,
  Divider,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSearchStocksQuery } from "../../../../../services/stockApi.ts";
import { IStockResponse } from "../../../../../services/types/ProductInterface.tsx";
import { StockType } from "../../../../../utils/constant.ts";

export function useFindStock() {
  // const [searchBy, setSearchBy] = useState<string>("1");
  const [searchValue, setSearchValue] = useState<string>("");
  const [select, setSelect] = useState<StockType>(StockType.STOCK);
  const [selectOption, setSelectOption] = useState<IStockResponse | null>(null);

  /** end-point */
  const { data, isLoading, isFetching } = useSearchStocksQuery(
    {
      search: searchValue,
      type: select,
    },
    { skip: searchValue.length < 3 },
  );

  const handleChange = (e: SelectChangeEvent<StockType>) => {
    setSelect(e.target.value as StockType);
  };

  // const onSearchBy = (event: SelectChangeEvent) => {
  //   setSearchBy(event.target.value);
  // };

  // const onClickListDown = (
  //   option: IProductResponse,
  //   event?: React.MouseEvent<HTMLLIElement, MouseEvent>,
  // ) => {
  //   return setSelectOption(option);
  // };

  // const handleKeyboardEvent = (
  //   event: React.KeyboardEvent<HTMLLIElement>,
  //   option: IProductResponse,
  // ) => {
  //   if (event.key === "Enter" || event.key === " ") {
  //     onClickListDown(option);
  //   }
  // };
  const handleOptionChange = (_event: React.SyntheticEvent, value: any) => {
    setSelectOption(value);
  };

  const onSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const returnJsx = () => {
    return (
      <Stack direction="row" gap={2}>
        <Stack gap={2} maxWidth={400} flexGrow={1}>
          <Stack gap={0.5}>
            <Stack>
              <Typography variant="body2" color="textSecondary">
                Search product
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption" color="warning">
                  Noted: Name / Code / Sku code
                </Typography>
                <Select size="small" value={select} onChange={handleChange}>
                  <MenuItem value={StockType.STOCK}>{StockType.STOCK}</MenuItem>
                  <MenuItem value={StockType.PRE_STOCK}>
                    {StockType.PRE_STOCK}
                  </MenuItem>
                  <MenuItem value={StockType.LIVE}>{StockType.LIVE}</MenuItem>
                </Select>
              </Stack>
            </Stack>
            <Autocomplete
              defaultValue={undefined}
              value={selectOption as IStockResponse | undefined}
              onChange={handleOptionChange}
              freeSolo
              size="small"
              id="free-solo-2-demo"
              disableClearable
              loading={isLoading || isFetching}
              options={data ? data.data : []}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                return `${option.name} - ${option.code} - ${option.skuCode}`;
              }}
              renderOption={(props, option) => (
                <Box
                  {...props}
                  key={option.id}
                  component="li"
                  // onClick={(event) => onClickListDown(option, event)}
                  // onKeyDown={(event) => handleKeyboardEvent(event, option)}
                >
                  {/* Use a unique key for each item */}
                  <Stack direction="row" gap={1}>
                    <Typography variant="body2" color="textSecondary">
                      {option.name}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body2" color="textSecondary">
                      {option.code}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {option.skuCode}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography variant="body2" color="textSecondary">
                      $ {option.price.toFixed(2)}
                    </Typography>
                  </Stack>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search"
                  value={searchValue}
                  onChange={onSearchValue}
                  slotProps={{
                    input: {
                      ...params.InputProps,
                      type: "search",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return { returnJsx, selectOption, setSelectOption, setSearchValue, select };
}
