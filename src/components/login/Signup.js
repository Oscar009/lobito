import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const Signup = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  async function createUser() {
    if (
      !user.email ||
      !user.apellidop||
      !user.apellidom ||
      !user.name
    ) {
      return setError("Campos faltantes");
    } else if (user.password !== user.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    } else if (user.password.length < 5) {
      return setError("La contraseña debe contener más de 6 caracteres");
    }
    try {
      setError("");
      setLoading(true);
      await signup(user.email, user.password);
    } catch (err) {
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
      marginTop="2%"
      marginBottom="2%"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Card sx={{ maxWidth: 345 }} styles={{ backgroundColor: "primary" }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            alignItems="center"
          >
            <DirectionsBusIcon sx={{ fontSize: 100 }} />
            <Typography fontSize="50px">Registro</Typography>
            <br></br>
            {error && (
              <div>
                <Alert severity="error">{error}</Alert>
                <br></br>
              </div>
            )}
            <TextField
              label="Nombre(s)"
              variant="outlined"
              type="text"
              value={user.name}
              onChange={onHandleChange}
              name="name"
            />
            <br></br>
            <TextField
              label="Apellido Paterno"
              variant="outlined"
              type="text"
              value={user.apellidop}
              onChange={onHandleChange}
              name="apellidop"
            />
            <br></br>
            <TextField
              label="Apellido Materno"
              variant="outlined"
              type="text"
              value={user.apellidom}
              onChange={onHandleChange}
              name="apellidom"
            />
            <br></br>
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
              variant="contained"
              onClick={() => {
                createUser();
                //history.push("/home")
              }}
              size="large"
            >
              Registrarse
            </Button>
            <br></br>
            <Typography>
              ¿Ya tienes una cuenta? <Link to="/">Accede</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
