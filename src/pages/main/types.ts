export type User = {
  name: string,
  email: string,
  secretKey?: string,
  otpSecretKey?: string,
  otpKeyUri?: string,
  authCode?: string;
  success?: string;
}
