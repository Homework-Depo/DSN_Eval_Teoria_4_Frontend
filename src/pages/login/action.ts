import { redirect } from "react-router-dom";
import { Errors } from "./types";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const token = formData.get("cf-turnstile-response");
  const errors: Errors = {};

  
  if (!email) {
    errors.email = "Por favor, ingresa un correo electrónico.";
  }
  
  if (!password) {
    errors.password = "Por favor, ingresa una contraseña.";
  }
  
  if (Object.keys(errors).length) {
    return errors;
  }
  
  const captchaResponse = await fetch("http://44.201.110.2:3000/api/v1/captcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token
    })
  });

  const captchaData = await captchaResponse.json();
  console.log(captchaData);

  if (!captchaData.success) {
    errors.captcha = "Captcha fallido, por favor intentalo de nuevo.";
    errors.cData = Date.now();
    return errors;
  }

  const response = await fetch("http://44.201.110.2:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
    credentials: "include"
  })

  if (response.status === 423) {
    errors.email = "Tu cuenta ha sido bloqueada por exceso de intentos fallidos. Por favor, contactate con el administrador.";
    errors.password = "Tu cuenta ha sido bloqueada por exceso de intentos fallidos. Por favor, contactate con el administrador.";
    return errors;
  }

  const data = await response.json();

  if (!data.success) {
    errors.email = "Credenciales inválidas. Por favor, intentalo de nuevo.";
    errors.password = "Credenciales inválidas. Por favor, intentalo de nuevo.";
    return errors;
  }

  return redirect("/");
}

export default action;