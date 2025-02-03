import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../../redux.ts";
import { useForm } from "react-hook-form";
import { IUserResponse } from "../../../../../services/types/UserInterface.tsx";
import InputText from "../../../../../components/Input/InputText.tsx";
import { validateEmail } from "../../../../../utils/common.ts";

const General = () => {
  const { user } = useAppSelector((state) => state.application);
  const formData = useForm<IUserResponse & { confirmPassword: string }>();
  return (
    <Stack gap={2} width="100%">
      <Stack gap={1}>
        <Typography variant="h3" fontWeight={600}>
          General
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Update your personal account
        </Typography>
      </Stack>
      <Divider />
      <Stack>
        <Typography variant="body2">Profile</Typography>
        <Stack py={2} direction="row" gap={2} alignItems="center">
          <Avatar
            sizes="small"
            alt={user ? user.username : "Riley Carter"}
            src={user ? user.profile : ""}
            sx={{ width: 50, height: 50 }}
          />
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // onClick={() => navigate("/admin/products/create")}
          >
            Upload new
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // startIcon={<AddRoundedIcon />}
            // onClick={() => navigate("/admin/products/create")}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" gap={3}>
        <Stack gap={0.5} flexGrow={1}>
          <Typography variant="body2" color="textSecondary">
            First name
          </Typography>
          <InputText
            formData={formData}
            name="firstName"
            placeholder="First name"
            error={formData.formState.errors["firstName"]}
            rules={{
              required: {
                value: true,
                message: "First name is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5} flexGrow={1}>
          <Typography variant="body2" color="textSecondary">
            Last name
          </Typography>
          <InputText
            formData={formData}
            name="lastName"
            placeholder="Last name"
            error={formData.formState.errors["lastName"]}
            rules={{
              required: {
                value: false,
                message: "Last name is required",
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack direction="row" gap={3}>
        <Stack gap={0.5} flexGrow={1}>
          <Typography variant="body2" color="textSecondary">
            Email
          </Typography>
          <InputText
            formData={formData}
            name="email"
            placeholder="Email"
            error={formData.formState.errors["email"]}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              validate: (val: any) => validateEmail(val),
            }}
          />
        </Stack>
        <Stack gap={0.5} flexGrow={1}>
          <Typography variant="body2" color="textSecondary">
            Phone
          </Typography>
          <InputText
            formData={formData}
            name="phone"
            placeholder="Phone"
            error={formData.formState.errors["phone"]}
            inputPropsTextField={{
              type: "number",
              slotProps: {
                htmlInput: {
                  min: 1,
                },
              },
            }}
            rules={{
              required: {
                value: true,
                message: "Phone is required",
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default General;
