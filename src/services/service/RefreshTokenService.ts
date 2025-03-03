import { store } from "../../redux.ts";
import { userApi } from "../userApi.ts";
import { dispatchUserInfo } from "../../redux/application.ts";
import { authService } from "./AuthService.ts";

// get refresh token
export const refreshTokenService = async (token: string) => {
  try {
    const res = await store
      .dispatch(
        userApi.endpoints.refreshToken.initiate({ refreshToken: token }),
      )
      .unwrap();
    store.dispatch(dispatchUserInfo(res));
    authService.setRefreshToken(res.refresh_token);
  } catch (err) {
    console.error(err);
    authService.removeRefreshToken();
  }
};
