interface ResetEmailDtoRes{
  opt:String

}
interface ResetEmailDtoReq{
  email:String  
}
interface ResetPasswordReq{
  email:String,
  otp:String,
  expectedDto:String,
  password:String,
}
interface ResetPasswordResDto{
  message:String[]
}



