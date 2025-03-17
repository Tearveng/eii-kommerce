import { Alert, Snackbar, Stack } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux.ts";
import { dispatchSnackbar } from "./redux/application.ts";
import AppRouter from "./router";
import { authService } from "./services/service/AuthService.ts";
import { refreshTokenService } from "./services/service/RefreshTokenService.ts";

function App() {
  const dispatch = useAppDispatch();
  const { snackbarMessage, snackbarStatus, user } = useAppSelector(
    (state) => state.application,
  );

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      refreshTokenService(refreshToken).then((r) => r);
    } else {
      authService.removeRefreshToken();
    }
  }, []);

  return (
    <Stack>
      {user && <AppRouter />}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(snackbarMessage)}
        onClose={() =>
          dispatch(dispatchSnackbar({ message: null, status: "error" }))
        }
        autoHideDuration={3000}
        key={"top-right"}
      >
        <Alert severity={snackbarStatus}>{snackbarMessage || ""}</Alert>
      </Snackbar>
    </Stack>
  );
}

export default App;
