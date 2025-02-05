import { Stack, Typography, TypographyProps } from "@mui/material";
import {
  Controller,
  FieldError,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { MuiTelInput, MuiTelInputProps } from "mui-tel-input";

interface IInputPhone<T extends Record<string, any>> {
  formData: UseFormReturn<T>;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  component?: "phoneNumber" | "textLength";
  placeholder: string;
  error?: FieldError;
  inputPropsTextField?: MuiTelInputProps;
  errorSx?: TypographyProps;
  disabled?: boolean;
}

const InputPhone = <T extends Record<string, any>>(props: IInputPhone<T>) => {
  const {
    formData,
    name,
    rules,
    placeholder,
    error,
    inputPropsTextField,
    errorSx,
  } = props;

  const { control } = formData;

  return (
    <Stack>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, ...rest } }) => {
          return (
            <MuiTelInput
              {...rest}
              {...inputPropsTextField}
              forceCallingCode
              defaultCountry="KH"
              sx={{
                ...inputPropsTextField?.sx,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // Remove the border
                },
                ".MuiButtonBase-root": {
                  border: "none",
                  height: 14,
                },
                ".MuiTelInput-flagButton": {
                  border: "none",
                },
              }}
              onChange={onChange}
              size="small"
              placeholder={placeholder}
            />
            // <TextField
            //   {...rest}
            //   {...inputPropsTextField}
            //   sx={{
            //     ...inputPropsTextField?.sx,
            //     "& .MuiInputBase-input::placeholder": {
            //       fontSize: "14px",
            //       color: "gray",
            //     },
            //     "& .MuiInputBase-input": {
            //       fontSize: "14px", // Set the font size of the input field
            //     },
            //     "& .MuiOutlinedInput-root": {
            //       "& fieldset": {
            //         borderColor: error ? "red" : "inherit", // Change border color when focused to red
            //       },
            //       "&.Mui-focused fieldset": {
            //         borderColor: !error ? "green" : "red", // Change border color when focused to red
            //         borderWidth: 1.5,
            //       },
            //     },
            //   }}
            //   onChange={onChange}
            //   size="small"
            //   placeholder={placeholder}
            // />
          );
        }}
      />
      {error && (
        <Typography
          {...errorSx}
          sx={{ color: "red", fontSize: 12, marginBottom: -2, ...errorSx?.sx }}
        >
          {error.message}
        </Typography>
      )}
    </Stack>
  );
};

export default InputPhone;
