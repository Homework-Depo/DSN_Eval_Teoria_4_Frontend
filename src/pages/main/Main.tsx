import { Container, Box, Paper, FormControl, FormHelperText, Button, Typography, InputLabel, OutlinedInput } from "@mui/material";
import { useActionData, Form, useLoaderData, useNavigate } from "react-router-dom";
import { User } from "./types";

import LogoutIcon from '@mui/icons-material/Logout';
import QRCode from "react-qr-code";

export default function Main() {
  const user = useLoaderData() as User;
  const navigate = useNavigate();
  const errors = useActionData() as User;

  const handleLogout = async () => {
    const response = await fetch("http://3.94.173.130:3000/api/v1/logout", {
      method: "POST",
      credentials: "include"
    });

    if (response.ok) {
      throw navigate("/login");
    }

    return null;
  }

  const handleDisable2fa = async () => {
    const response = await fetch("http://3.94.173.130:3000/api/v1/disable", {
      method: "POST",
      credentials: "include"
    });

    const data = await response.json();
    console.log(data);

    if (data.status === "success") {
      navigate("/", { replace: true });
    }

    return;
  }

  return (
    <Container maxWidth="sm">
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100dvh'}
      >
        <Paper elevation={5} sx={{
          width: '100%',
          padding: 2
        }}>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"} flexBasis={"auto"}>
            <Typography variant="h5" width={"100%"}>Bienvenido {user.name}.</Typography>
            <Box display={"flex"} justifyContent={"end"} width={"100%"}>
              <Button variant="contained" color="primary" onClick={handleLogout} >
                <LogoutIcon />
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: {
                sm: 1,
                md: 550
              },
              gap: 2,
              textAlign: 'justify'
            }}
          >
            <Box
              sx={{
                display: 'inline',
                textAlign: 'left',
              }}
              marginTop={5}
            >
              <Typography component={"span"} variant="h6" fontWeight={500}>{"Autenticación en dos pasos: ".toUpperCase()}</Typography>
              <Typography
                component={"span"}
                variant="h6"
                fontWeight={500}
                color={user.secretKey ? "success.main" : "error"}
              >
                {user.secretKey ? "ACTIVADO" : "DESACTIVADO"}
              </Typography>
            </Box>
            {!user.secretKey ?
              <>
                <Typography>
                  Las aplicaciones de autenticación y las extensiones de navegador como 1Password, Authy, Microsoft Authenticator,
                  etc. generan contraseñas de un solo uso que se utilizan como un segundo factor para verificar su identidad cuando se le solicita
                  durante el inicio de sesión.
                </Typography>

                <Typography fontWeight={500}>1. ESCANEA EL CÓDIGO QR  O INGRESA EL CÓDIGO EN TU APLICATIVO</Typography>

                <Box
                  sx={{
                    height: 250,
                    width: "auto"
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: 250, maxWidth: "100%", width: "auto" }}
                    value={user.otpKeyUri?.toString() || ""}
                    viewBox={`0 0 256 256`}
                  />
                </Box>
                <Typography>{user.otpSecretKey}</Typography>
                <Typography fontWeight={500}>2. CONFIRMA LA CLAVE DE 6 DIGITOS</Typography>
                <Form method='post'>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 1,
                      gap: 2
                    }}
                  >
                    <FormControl>
                      <InputLabel htmlFor="authCode">Verifica el código de la aplicación</InputLabel>
                      <OutlinedInput
                        id="authCode"
                        name="authCode"
                        type="text"
                        label="Verifica el código de la aplicación"
                      />
                      {errors?.authCode && <FormHelperText error>{errors?.authCode}</FormHelperText>}
                    </FormControl>
                    <input type="hidden" name="otpSecretKey" value={user.otpSecretKey} />
                    <Box><Button variant='contained' type='submit'>GUARDAR</Button></Box>
                  </Box>
                </Form>
              </> : <>
                <div>
                  <Button variant="contained" onClick={handleDisable2fa}>DESACTIVAR AUTENTICACIÓN EN DOS PASOS</Button>
                </div>
              </>}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}