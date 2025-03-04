import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Divider,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useSearchUsersQuery } from "../../../../../services/adminApi.ts";
import { IUserResponse } from "../../../../../services/types/UserInterface.tsx";
import { IDepositRegister } from "./OrderDeposit.tsx";

export interface IUseFindUser {
  key: keyof IUserResponse;
  formData: UseFormReturn<IDepositRegister>;
}

export const useFindUser = (props: IUseFindUser) => {
  const { formData, key } = props;
  const [selectUser, setSelectUser] = useState<IUserResponse | null>(null);
  const value = formData.watch(key);
  console.log("key", key)
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

  const handleOptionChange = (_event: React.SyntheticEvent, value: any) => {
    setSelectUser(value);
  };

  const findUserJsx = (
    autoParam: (param: AutocompleteRenderInputParams) => JSX.Element,
    k: keyof IUserResponse,
  ) => {
    return (
      <Stack direction="row" gap={2}>
        <Stack gap={0.5} flexGrow={1}>
          <Autocomplete
            value={selectUser as IUserResponse | undefined}
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
              return option[k as string];
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

  return { findUserJsx, selectUser, setSelectUser };
};
