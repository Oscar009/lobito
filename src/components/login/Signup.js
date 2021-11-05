import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";

const Signup = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const { signup } = useAuth();

  async function createUser() {
    if (user.password !== user.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }
    try {
      setError("");
      setLoading(true);
      await signup(user.email, user.password);
    } catch(err) {
      console.log(err);
      setError("Fallo al crear cuenta");
    }
    setLoading(false);
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      marginTop="8%"
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
        <Typography fontSize="50px">Registro</Typography>
        <br></br>
        {error && (
          <div>
            <Alert severity="error">{error}</Alert>
            <br></br>
          </div>
        )}
        <TextField
          label="Correo"
          variant="outlined"
          type="email"
          value={user.email}
          onChange={onHandleChange}
          name="email"
        />
        <br></br>
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          value={user.password}
          onChange={onHandleChange}
          name="password"
        />
        <br></br>
        <TextField
          label="Confirmar contraseña"
          variant="outlined"
          type="password"
          value={user.confirmPassword}
          onChange={onHandleChange}
          name="confirmPassword"
        />
        <br></br>
        <Button
          disabled={loading}
          variant="outlined"
          onClick={() => {
            createUser();
            //history.push("/home")
          }}
        >
          Registrarse
        </Button>
        <br></br>
        <Typography>
          ¿Ya tienes una cuenta?{" "}
          <Button onClick={() => history.push("/")}>Accede</Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
