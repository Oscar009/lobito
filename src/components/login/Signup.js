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
import firebase from "../../firebase";

const db = firebase.database();

const Signup = () => {
  const [user, setUser] = useState([
    { email: "", password: "", confirmPassword: "" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const { signup } = useAuth();

  async function createUser() {
    if (!user.email) {
      return setError("Campos faltantes");
    } else if (user.password !== user.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    } else if (user.password.length < 5) {
      return setError("La contraseña debe contener más de 6 caracteres");
    }
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      await signup(user.email, user.password);
      setSuccess("Cuenta creada");
      postNewUser();
      user.email = user.password = user.confirmPassword = "";
    } catch (err) {
      console.log(err);
      setError("Fallo al crear cuenta");
    }
    setLoading(false);
  }


  const postNewUser = () => {
    const ref = db.ref("users");
    let newUser = {
      email: user.email,
      horario: "",
    };
    ref.push(newUser);
  };

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      marginTop="3%"
      marginBottom="3%"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Card sx={{ maxWidth: 345 }} elevation={10}>
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
            {success && (
              <div>
                <Alert severity="success">{success}</Alert>
                <br></br>
              </div>
            )}
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
