import {
  Stack,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import {
  Controller,
  FieldError,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

interface IInputText<T extends Record<string, any>> {
  formData: UseFormReturn<T>;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  component?: "phoneNumber" | "textLength";
  placeholder: string;
  error?: FieldError;
  inputPropsTextField?: TextFieldProps;
  errorSx?: TypographyProps;
  disabled?: boolean;
}

const InputText = <T extends Record<string, any>>(props: IInputText<T>) => {
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
            <TextField
              {...rest}
              {...inputPropsTextField}
              sx={{
                ...inputPropsTextField?.sx,
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "14px",
                  color: "gray",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px", // Set the font size of the input field
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: error ? "red" : "inherit", // Change border color when focused to red
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: !error ? "green" : "red", // Change border color when focused to red
                    borderWidth: 1.5,
                  },
                },
              }}
              onChange={onChange}
              size="small"
              placeholder={placeholder}
            />
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

export default InputText;
