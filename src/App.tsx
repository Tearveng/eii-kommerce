import { Alert, Snackbar, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux.ts";
import { dispatchSnackbar, dispatchUserInfo } from "./redux/application.ts";
import AppRouter from "./router";
import { useRefreshTokenMutation } from "./services/userApi.ts";

function App() {
  const dispatch = useAppDispatch();
  const [getRefreshToken, { isLoading }] = useRefreshTokenMutation();
  const { snackbarMessage, snackbarStatus } = useAppSelector((state) => state.application);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      getRefreshToken({ refreshToken })
        .unwrap()
        .then((res) => {
          if (res) {
            dispatch(dispatchUserInfo(res));
            localStorage.setItem("refresh_token", res.refresh_token);
          }
        });
    }
  }, []);

  if (isLoading) {
    return <>loading ...</>;
  }

  return (
    <Stack>
      <AppRouter />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(snackbarMessage)}
        onClose={() => dispatch(dispatchSnackbar({ message: null, status: 'error' }))}
        autoHideDuration={3000}
        key={"top-right"}
      >
        <Alert severity={snackbarStatus}>
          {snackbarMessage ? snackbarMessage : ""}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default App;
