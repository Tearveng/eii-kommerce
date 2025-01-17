import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import InputText from "../../../../../components/Input/InputText";
import { IProductResponse } from "../../../../../services/types/ProductInterface";
import DropZoneUpload from "../../DropZoneUpload";
// import ForgotPassword from "./components/ForgotPassword";
// import AppTheme from "../shared-theme/AppTheme";
// import ColorModeSelect from "../shared-theme/ColorModeSelect";
// import {
//   GoogleIcon,
//   FacebookIcon,
//   SitemarkIcon,
// } from "./components/CustomIcons";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  //   height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up("sm")]: {
  //     padding: theme.spacing(4),
  //   },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const ProductCreate = () => {
  const formData = useForm<IProductResponse>();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: IProductResponse) => {
    // if (emailError || passwordError) {
    //   event.preventDefault();
    //   return;
    // }
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      {/* <SignInContainer direction="column" justifyContent="space-between"> */}
      {/* <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} /> */}
      {/* <SitemarkIcon /> */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Create
      </Typography>
      <Box
        component="form"
        onSubmit={formData.handleSubmit(handleSubmit)}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {/* <FormControl> */}
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Name
          </Typography>
          <InputText
            formData={formData}
            name="name"
            placeholder="Name"
            error={formData.formState.errors["name"]}
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Description
          </Typography>
          <InputText
            formData={formData}
            name="description"
            placeholder="Description"
            error={formData.formState.errors["description"]}
            inputPropsTextField={{
              type: "text",
              multiline: true,
              rows: 5,
            }}
            rules={{
              required: {
                value: false,
                message: "Description is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Sku Code
          </Typography>
          <InputText
            formData={formData}
            name="skuCode"
            placeholder="Sku Code"
            error={formData.formState.errors["skuCode"]}
            rules={{
              required: {
                value: true,
                message: "Sku Code is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Price
          </Typography>
          <InputText
            formData={formData}
            name="price"
            placeholder="Price"
            error={formData.formState.errors["price"]}
            inputPropsTextField={{
              type: "number",
            }}
            rules={{
              required: {
                value: true,
                message: "Price is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Quantity
          </Typography>
          <InputText
            formData={formData}
            name="quantity"
            placeholder="Quantity"
            error={formData.formState.errors["quantity"]}
            inputPropsTextField={{
              type: "number",
            }}
            rules={{
              required: {
                value: true,
                message: "Quantity is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Thumbnail
          </Typography>
          <DropZoneUpload />
        </Stack>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCreate;
