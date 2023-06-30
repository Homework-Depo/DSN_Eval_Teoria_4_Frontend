import PasswordIcon from '@mui/icons-material/Password';
import AbcIcon from '@mui/icons-material/Abc';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Box, Button, Container, FormControl, FormGroup, FormHelperText, FormLabel, InputAdornment, Paper, TextField } from "@mui/material";
import { Form, Link, useActionData } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { Errors } from "./types";

export default function Register() {
  //const [cData, setCData] = useState(Date.now().toString());
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
            <FormLabel sx={{ marginBottom: 2 }} component="legend">Registro</FormLabel>
            <FormGroup sx={{ gap: 3 }}>
              <TextField
                label="Nombre"
                name="name"
                id="name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AbcIcon />
                    </InputAdornment>
                  )
                }}
                variant="outlined"
                error={errors?.name ? true : false}
                helperText={errors?.name}
              />
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
              <FormControl>
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
                <FormHelperText error={errors?.captcha ? true : false}>{errors?.captcha}</FormHelperText>
              </FormControl>
              <Box display={"flex"} flexDirection={"column"} gap={1}>
                <Button variant="contained" type="submit">Registrar</Button>
                <Button variant='contained' color="error" component={Link} to="/login">Volver</Button>
              </Box>
            </FormGroup>
          </Form>
        </Paper>
      </Box>
    </Container>
  );
}