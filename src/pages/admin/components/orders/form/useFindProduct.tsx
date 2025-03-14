import { Autocomplete, Box, Divider, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useSearchProductsQuery } from "../../../../../services/productApi.ts";
import { IProductResponse } from "../../../../../services/types/ProductInterface.tsx";

export function useFindProduct() {
  // const [searchBy, setSearchBy] = useState<string>("1");
  const [searchValue, setSearchValue] = useState<string>("");
  const [type, setType] = useState<string>("STOCK");
  const [selectOption, setSelectOption] = useState<IProductResponse | null>(
    null,
  );

  /** end-point */
  const { data, isLoading, isFetching } = useSearchProductsQuery(
    {
      search: searchValue,
    },
    { skip: searchValue.length < 3 },
  );

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
  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    setType(e.target.value)
  }

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
          <Stack gap={1}>
            <Typography variant="body2" color="textSecondary">
              Type
            </Typography>
            <Select
              value={type}
              onChange={handleTypeChange}
            >
              <MenuItem value={'STOCK'}>STOCK</MenuItem>
              <MenuItem value={'PRE-STOCK'}>PRE-STOCK</MenuItem>
              <MenuItem value={'LIVE'}>LIVE</MenuItem>
            </Select>
          </Stack>
          <Stack gap={0.5}>
            <Typography variant="body2" color="textSecondary">
              Search product
            </Typography>
            <Typography variant="caption" color="warning">
              Noted: Name / Code / Sku code
            </Typography>
            <Autocomplete
              defaultValue={undefined}
              value={selectOption as IProductResponse | undefined}
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
                return `${option.name} - ${option.code} - ${option.skuCode}`
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

  return { returnJsx, selectOption, setSelectOption, setSearchValue, type };
};
