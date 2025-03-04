interface AuthService {
  setRefreshToken: (token: string) => void;
  removeRefreshToken: () => void;
  getRefreshToken: () => string | null;
  isAuthenticated: () => boolean;
}

export const authService: AuthService = {
  setRefreshToken(token: string): void {
    localStorage.setItem("refresh_token", token);
  },

  removeRefreshToken(): void {
    window.dispatchEvent(new Event("token_removed"));
  },

  getRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  },

  isAuthenticated(): boolean {
    const token = this.getRefreshToken();
    return !!token && token !== "undefined" && token !== null;
  },
};
