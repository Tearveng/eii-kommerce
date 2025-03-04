import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../redux.ts";
import { dispatchUserInfo } from "../redux/application.ts";
import { refreshTokenService } from "../services/service/RefreshTokenService.ts";

export const useAuthWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = (): void => {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        refreshTokenService(refreshToken).then((e) => e);
      } else {
        redirectToLogin();
      }
    };

    const handleStorageChange = (event: StorageEvent): void => {
      if (event.key === "refresh_token" && !event.newValue) {
        redirectToLogin();
      }
    };

    const handleTokenRemove = (): void => {
      redirectToLogin();
    };

    const redirectToLogin = () => {
      if (window.location.pathname !== "/login") {
        localStorage.removeItem("refresh_token");
        store.dispatch(dispatchUserInfo(null));
        navigate("/login", { replace: true });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("token_removed", handleTokenRemove);
    const intervalId = setInterval(checkToken, 5000);
    checkToken();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("token_removed", handleTokenRemove);
      clearInterval(intervalId);
    };
  }, [navigate]);
};
