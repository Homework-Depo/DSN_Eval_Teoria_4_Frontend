import { redirect } from "react-router-dom";
import { Errors } from "./types";
const loader = async ({ request }: { request: Request }) => {
  const errors = {} as Errors;
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email || !emailRegex.test(email)) {
    errors.email = "Por favor ingrese un correo electrónico válido.";
    return errors;
  }

  const response = await fetch('http://44.201.110.2:3000/api/v1/password-reset/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  const data = await response.json();

  if (!data.success) {
    errors.email = "Error al enviar el correo electrónico. Por favor intente de nuevo.";
  }

  throw redirect("/submit-password-reset");
}

export default loader;