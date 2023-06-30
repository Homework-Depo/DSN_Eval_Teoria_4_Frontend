import { Container, Box, Paper, FormLabel, FormGroup, TextField, InputAdornment, Button, FormHelperText } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import { Errors } from "./types";

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PasswordIcon from '@mui/icons-material/Password';

export default function SubmitPasswordReset() {
  const errors = useActionData() as Errors;

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
            <Box marginBottom={3}>
              <FormLabel>Reestablecer Contraseña</FormLabel>
            </Box>
            <FormGroup sx={{ gap: 3 }}>
              <TextField
                name="passwordResetToken"
                id="passwordResetToken"
                label="Código de Recuperación"
                type="text"
                error={errors?.passwordResetToken ? true : false}
                helperText={errors?.passwordResetToken}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VpnKeyIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                name="password"
                id="password"
                label="Nueva Contraseña"
                type="password"
                error={errors?.password ? true : false}
                helperText={errors?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                name="passwordConfirmation"
                id="passwordConfirmation"
                label="Confirmar Nueva Contraseña"
                type="password"
                error={errors?.passwordConfirmation ? true : false}
                helperText={errors?.passwordConfirmation}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PasswordIcon />
                    </InputAdornment>
                  )
                }}
              />
              {errors?.general && <FormHelperText error>{errors?.general}</FormHelperText>}
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Button variant="contained" type="submit">Enviar</Button>
                <Button variant="contained" color="error" component={Link} to="/login">Volver</Button>
              </Box>
            </FormGroup>
          </Form>
        </Paper>
      </Box>
    </Container>
  )
}