import { Container, Box, Paper, FormGroup, TextField, InputAdornment, FormHelperText, Button, FormLabel } from "@mui/material";
import { useActionData, Form, Link } from "react-router-dom";
import { Errors } from "./types";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import { Turnstile } from "@marsidev/react-turnstile";

export default function Login() {
  const errors: Errors = useActionData() as Errors;

  return (
    <Container maxWidth="sm">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100dvh'}
      >
        <Paper elevation={5} sx={{
          width: 400,
          padding: 2
        }}>
          <Form noValidate autoComplete="off" method="post">
            <FormLabel sx={{ marginBottom: 2 }} component="legend">Iniciar Sesión</FormLabel>
            <FormGroup sx={{ gap: 3 }}>
              <TextField
                label="Correo Electrónico"
                name="email"
                id="email"
                type="email"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                error={errors?.email ? true : false}
                helperText={errors?.email}
              />
              <TextField
                label="Contraseña"
                name="password"
                id="password"
                type="password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                error={errors?.password ? true : false}
                helperText={errors?.password}
              />
              <Turnstile
                  siteKey="0x4AAAAAAAGq7Dpw8q6kOG0Q"
                  /* siteKey="3x00000000000000000000FF" */
                  options={{
                    theme: "light",
                    size: "normal",
                    language: "es",
                    cData: errors?.cData?.toString()
                  }}
                />
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Button variant="contained" type="submit">Entrar</Button>
                <Button variant="contained" color="secondary" component={Link} to="/register">Registrarse</Button>
                <Box width={"100%"} display={"flex"} justifyContent={"end"}>
                  <FormHelperText sx={{ color: "primary.main" }} component={Link} to="/request-password-reset">Reestablecer Contraseña</FormHelperText>
                </Box>
              </Box>
            </FormGroup>
          </Form>
        </Paper>
      </Box>
    </Container>
  );
}