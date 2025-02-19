import {
  AutocompleteRenderInputParams,
  Stack,
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
  inputPropsAutoComplete?: AutocompleteRenderInputParams;
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
    inputPropsAutoComplete,
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
              {...inputPropsAutoComplete}
              // slotProps={{
              //   input: {
              //     ...inputPropsAutoComplete?.InputProps,
              //   },
              // }}
              forceCallingCode
              defaultCountry="KH"
              sx={{
                ...inputPropsTextField?.sx,
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
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
              size="medium"
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

export default InputPhone;
