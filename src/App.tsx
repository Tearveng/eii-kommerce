import AppRouter from "./router";
import { useEffect } from "react";
import { useRefreshTokenMutation } from "./services/userApi.ts";
import { dispatchUserInfo } from "./redux/application.ts";
import { useAppDispatch } from "./redux.ts";

function App() {
  const dispatch = useAppDispatch();
  const [getRefreshToken, { isLoading }] = useRefreshTokenMutation();
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

  return <AppRouter />;
}

export default App;
