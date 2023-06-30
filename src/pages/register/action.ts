import { redirect } from "react-router-dom";
import { Errors } from "./types";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const token = formData.get("cf-turnstile-response");
  const errors: Errors = {};

  if (!name) {
    errors.name = "Por favor, ingresa un nombre.";
  }

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

  if (!captchaData.success) {
    errors.captcha = "Captcha fallido, por favor intentalo de nuevo.";
    errors.cData = Date.now();
    return errors;
  }

  const response = await fetch("http://44.201.110.2:3000/api/v1/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
    credentials: "include",
  })

  console.log(response);

  const data = await response.json();

  console.log(data);

  if (!data.success) {
    return data.message;
  }

  throw redirect("/");
}

export default action;