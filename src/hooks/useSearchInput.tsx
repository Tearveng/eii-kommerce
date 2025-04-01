import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

export const useSearchInput = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const searchJsx = () => {
    return (
      <TextField
        sx={{
          minWidth: 300,
          height: "30px",
          "& .MuiInputBase-root": { height: "100%" },
        }}
        placeholder="Search"
        size="small"
        onChange={handleChange}
        value={value}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ cursor: "pointer", height: 10 }}
              >
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    );
  };

  return { searchJsx, value };
};
