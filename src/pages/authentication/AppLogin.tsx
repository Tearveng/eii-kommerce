import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputText from "../../components/Input/InputText";
import { useLoginMutation } from "../../services/userApi.ts";
import { dispatchUserInfo } from "../../redux/application.ts";
import { useAppDispatch } from "../../redux.ts";
import { useNavigate } from "react-router-dom";

interface ILogin {
  email: string;
  password: string;
}

const AppLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const formData = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // end-point
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const handleShowPassword = () => (showPassword ? "password" : "text");
  const validateEmail = (email: string) => {
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return "Please match the requested format";
      }
    } else {
      return undefined;
    }
  };
  const handleLogin = async (data: ILogin) => {
    return login(data)
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(dispatchUserInfo(res));
          localStorage.setItem("refresh_token", res.refresh_token);
          navigate("/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
        px: 2,
      }}
    >
      <form onSubmit={formData.handleSubmit(handleLogin)} id="login-form">
        <Stack minWidth={400} gap={3}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: 600 }}
          >
            LOGIN
          </Typography>
          <Stack>
            <Typography variant="body2">Email</Typography>
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
                validate: (val: string) => validateEmail(val),
              }}
            />
          </Stack>
          <Stack>
            <Typography variant="body2">Password</Typography>
            <InputText
              formData={formData}
              name="password"
              placeholder="Password"
              error={formData.formState.errors["password"]}
              rules={{
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              inputPropsTextField={{
                slotProps: {
                  input: {
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ cursor: "pointer", height: 10 }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff sx={{ width: 20 }} />
                        ) : (
                          <Visibility sx={{ width: 20 }} />
                        )}
                      </InputAdornment>
                    ),
                  },
                },
                type: handleShowPassword(),
              }}
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Link href="#" color="info">
              <Typography variant="body2">Forgot password ?</Typography>
            </Link>
            <Link href="#" color="info">
              <Typography variant="body2">Sign Up!</Typography>
            </Link>
          </Stack>
          <Stack>
            <Button
              variant="contained"
              sx={{
                boxShadow: "none",
                textTransform: "none",
                minHeight: "40px",
              }}
              form="login-form"
              type="submit"
              disabled={loginLoading}
              startIcon={
                loginLoading && <CircularProgress color="inherit" size={20} />
              }
            >
              {loginLoading ? "logging..." : "Login"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default AppLogin;
