export type ResetEmailDtoRes = {
  otp: string;
  iat: string;
};
export type ResetEmailDtoReq = {
  email: string;
};
export type ResetPasswordReq = {
  email: string;
  otp: string;
  expectedDto: string;
  iat: string;
  password: string;
};
export type ResetPasswordResDto = {
  message: string[];
};
