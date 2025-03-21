import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { TextField } from "@mui/material";

export const useDatePicker = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>();
  const [endDate, setEndDate] = useState<Dayjs | null>();

  const startDateJSX = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            defaultValue={dayjs("2022-04-17")}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 30,
                      overflowY: "hidden",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Default state
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Hover state
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Focus state
                      },
                    },
                    "& .MuiInputLabel-root": { fontSize: "0.75rem" },
                    "& .MuiOutlinedInput-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Default state
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Hover state
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "transparent", // Focus state
                      },
                    },
                    width: 120,
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                      fontSize: "1rem", // Change icon size (default is ~24px or 1.5rem)
                    },
                  }}
                />
              ),
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  const endDateJSX = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker defaultValue={dayjs("2022-04-17")} />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  return { startDateJSX, startDate, endDate };
};
