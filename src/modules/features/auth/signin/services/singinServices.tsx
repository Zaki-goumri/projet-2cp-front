import { serialize } from "cookie";

export const errorMessages: Record<number, string> = {
    400: "Bad Request. Please check your input.",
    401: "Unauthorized! Wrong email or password.",
    403: "Forbidden! You don't have permission.",
    404: "Wrong email or password please try again.",
    500: "Server error! Try again later.",
  };

export const setTokens = (accessToken: any, refreshToken: any) => {
  console.log(accessToken,refreshToken)
  document.cookie = serialize("accessToken", accessToken, {
    httpOnly: false,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  document.cookie = serialize("refreshToken", refreshToken, {
    httpOnly: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  // window.location.href = "/";
  return;
};
