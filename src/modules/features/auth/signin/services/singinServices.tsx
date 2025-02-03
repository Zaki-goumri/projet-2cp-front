import { serialize } from "cookie";

export const setTokens = (accessToken: string, refreshToken: string) => {
  document.cookie = serialize("accessToken", accessToken, {
    httpOnly: false,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  });
  document.cookie = serialize("refreshToken", refreshToken, {
    httpOnly: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  window.location.href = "/";
  return;
};
