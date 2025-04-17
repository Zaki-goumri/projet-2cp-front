interface ResetEmailDtoRes {
  otp: string;
  iat: string;
}
interface ResetEmailDtoReq {
  email: string;
}
interface ResetPasswordReq {
  email: string;
  otp: string;
  expectedDto: string;
  iat: string;
  password: string;
}
interface ResetPasswordResDto {
  message: string[];
}
