import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Autocomplete, Box, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSearchProductsQuery } from "../../../../../services/productApi.ts";
import { IProductResponse } from "../../../../../services/types/ProductInterface.tsx";

export const useFindProduct = () => {
  // const [searchBy, setSearchBy] = useState<string>("1");
  const [searchValue, setSearchValue] = useState<string>("");
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

  const onClickListDown = (
    option: IProductResponse,
    event?: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    return setSelectOption(option);
  };

  const handleKeyboardEvent = (
    event: React.KeyboardEvent<HTMLLIElement>,
    option: IProductResponse,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      onClickListDown(option);
    }
  };
  const handleOptionChange = (_event: React.SyntheticEvent, value: any) => {
    setSelectOption(value);
  };

  const onSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const returnJsx = () => {
    return (
      <Stack direction="row" gap={2}>
        <Stack gap={0.5} maxWidth={400} flexGrow={1}>
          <Typography variant="body2" color="textSecondary">
            Search product
          </Typography>
          <Typography variant="caption" color="warning">
            Noted: Name / Code / Sku code
          </Typography>
          <Autocomplete
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
              return option.name;
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
    );
  };

  return { returnJsx, selectOption, setSelectOption, setSearchValue };
};
