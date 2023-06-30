import { Container, Box, Paper, FormGroup, TextField, InputAdornment, Button, FormLabel } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Errors } from "./types";

export default function RequestPasswordReset() {
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
            <Box marginBottom={2}>
              <FormLabel>Solicitud de Reestablecimiento de Contraseña</FormLabel>
            </Box>
            <FormGroup sx={{ gap: 3 }}>
              <TextField
                name="email"
                id="email"
                label="Correo Electrónico"
                type="email"
                error={errors?.email ? true : false}
                helperText={errors?.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AlternateEmailIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Button variant="contained" type="submit">Continuar</Button>
                <Button variant="contained" color="error" component={Link} to="/login">Volver</Button>
              </Box>
            </FormGroup>
          </Form>
        </Paper>
      </Box>
    </Container>
  )
}