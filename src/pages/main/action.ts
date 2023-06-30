import { User } from "./types";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const authCode = formData.get("authCode") as string;
  const otpSecretKey = formData.get("otpSecretKey") as string;
  const errors = {} as User;

  const response = await fetch("http://localhost:3000/api/v1/enable", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode, otpSecretKey }),
  });
  console.log(authCode, otpSecretKey);
  const data = await response.json();

  if (!data.status) {
    errors.authCode = "Clave de autenticación inválida, porfavor intenta de nuevo.";
    return errors;
  }
  
  errors.success = "2FA ha sido habilitado exitosamente.";
  return errors;
}

export default action;
