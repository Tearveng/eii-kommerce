import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputText from "../../../../../components/Input/InputText.tsx";
import { validateEmail } from "../../../../../utils/common.ts";
import InputPhone from "../../../../../components/Input/InputPhone.tsx";
import { Autocomplete, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useSearchProductsQuery } from "../../../../../services/productApi.ts";
import { IProductResponse } from "../../../../../services/types/ProductInterface.tsx";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
];

export const useFindProduct = () => {
  const [searchBy, setSearchBy] = useState<string>("1");
  const [searchValue, setSearchValue] = useState<string>("");

  /** end-point */
  const { data, isLoading, isFetching } = useSearchProductsQuery(
    {
      search: searchValue,
    },
    { skip: searchValue.length < 3 },
  );

  console.log(data);

  const onSearchBy = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value);
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
              <li {...props} key={option.id}>
                {/* Use a unique key for each item */}
                {option.name}
              </li>
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

  return { returnJsx };
};
