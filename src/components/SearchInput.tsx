import { TextField } from "@mui/material";
import { useState } from "react";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <TextField
      placeholder="Search"
      size="small"
      onChange={handleChange}
      value={value}
    />
  );
};

export default SearchInput;
