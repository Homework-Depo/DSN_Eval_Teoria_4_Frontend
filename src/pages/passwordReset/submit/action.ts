import { redirect } from "react-router-dom";
import { Errors } from "./types";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const passwordResetToken = formData.get('passwordResetToken');
  const password = formData.get('password');
  const passwordConfirmation = formData.get('passwordConfirmation');

  const passwordRegex = new RegExp("^(.{8,})$");
  const passwordResetTokenRegex = new RegExp("^[A-Za-z0-9]{6}$");

  const errors = {} as Errors;

  if (!passwordResetToken || !passwordResetTokenRegex.test(passwordResetToken as string)) {
    errors.passwordResetToken = "Por favor ingrese un código de recuperación válido.";
  }

  if (!password || !passwordRegex.test(password as string)) {
    errors.password = "Contraseñas deben tener al menos 8 caracteres.";
  }

  if (!passwordConfirmation || !passwordRegex.test(passwordConfirmation as string)) {
    errors.passwordConfirmation = "Contraseñas deben tener al menos 8 caracteres.";
  }

  if (password !== passwordConfirmation) {
    errors.password = "Ambas contraseñas deben coincidir.";
    errors.passwordConfirmation = "Ambas contraseñas deben coincidir.";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  try {
    const response = await fetch("http://44.201.110.2:3000/api/v1/password-reset/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        passwordResetToken,
        password,
        passwordConfirmation,
      }),
    });

    if (response.status === 409) {
      errors.general = "La nueva contraseña no puede coincidir con la anterior. Por favor, elija otra contraseña.";
      return errors;
    }

    const data = await response.json();

    if (!data.success) {
      errors.general = "Error al restablecer la contraseña. Por favor intentelo en otro momento.";
    }

    return redirect("/login");
  } catch (error) {
    errors.general = "Error al restablecer la contraseña. Por favor intentelo en otro momento.";
    throw error
  }
}

export default action;