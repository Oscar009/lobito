import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          <Link to="/">Accede</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;
