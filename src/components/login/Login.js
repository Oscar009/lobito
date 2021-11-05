import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";

const Login = () => {
  let history = useHistory();

  return (
    <Box
      marginTop="10%"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        alignItems="center"
      >
        <Typography fontSize="50px">Lobito</Typography>
        <br></br>
        <TextField label="Correo" variant="outlined" type="text" />
        <br></br>
        <TextField label="Contraseña" variant="outlined" type="password" />
        <br></br>
        <Button variant="outlined" onClick={() => history.push("/home")}>
          Acceder
        </Button>
        <br></br>
        <Typography>
          ¿No tienes una cuenta?{" "}
          <Button onClick={() => history.push("/signup")}>Registrate</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;