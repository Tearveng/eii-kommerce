import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSearchProductsQuery } from "../../../../../services/productApi.ts";
import { IProductResponse } from "../../../../../services/types/ProductInterface.tsx";
import { useSearchUsersQuery } from "../../../../../services/adminApi.ts";
import {
  IUser,
  IUserResponse,
} from "../../../../../services/types/UserInterface.tsx";
import { UseFormReturn } from "react-hook-form";

export interface IUseFindUser {
  key: keyof IUserResponse;
  formData: UseFormReturn<IUserResponse & { products: IProductResponse[] }>;
}

export const useFindUser = (props: IUseFindUser) => {
  const { formData, key } = props;
  const [selectOption, setSelectOption] = useState<IUserResponse | null>(null);
  const value = formData.watch(key);

  /** end-point */
  const { data, isLoading, isFetching } = useSearchUsersQuery(
    {
      key,
      search: value,
    },
    {
      skip: !key || !value || value.toString().length < 3,
    },
  );

  // const onSearchBy = (event: SelectChangeEvent) => {
  //   setSearchBy(event.target.value);
  // };

  // const onClickListDown = (
  //   option: IUserResponse,
  //   event?: React.MouseEvent<HTMLLIElement, MouseEvent>,
  // ) => {
  //   return setSelectOption(option);
  // };
  //
  // const handleKeyboardEvent = (
  //   event: React.KeyboardEvent<HTMLLIElement>,
  //   option: IUserResponse,
  // ) => {
  //   if (event.key === "Enter" || event.key === " ") {
  //     onClickListDown(option);
  //   }
  // };
  const handleOptionChange = (_event: React.SyntheticEvent, value: any) => {
    setSelectOption(value);
  };

  const findUserJsx = (
    autoParam: (param: AutocompleteRenderInputParams) => JSX.Element,
  ) => {
    return (
      <Stack direction="row" gap={2}>
        <Stack gap={0.5} flexGrow={1}>
          <Autocomplete
            value={selectOption as IUserResponse | undefined}
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
              return option.email;
            }}
            renderOption={(p, option) => (
              <Box
                {...p}
                key={option.id}
                component="li"
                // onClick={(event) => onClickListDown(option, event)}
                // onKeyDown={(event) => handleKeyboardEvent(event, option)}
              >
                {/* Use a unique key for each item */}
                <Stack direction="row" gap={1}>
                  <Typography variant="body2" color="textSecondary">
                    N: {option.firstName} {option.lastName}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="body2" color="textSecondary">
                    E: {option.email}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="body2" color="textSecondary">
                    P: {option.phone}
                  </Typography>
                </Stack>
              </Box>
            )}
            renderInput={(params) => autoParam(params)}
          />
        </Stack>
      </Stack>
    );
  };

  return { findUserJsx, selectOption, setSelectOption };
};
