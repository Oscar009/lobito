import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";
import { Link, useHistory } from "react-router-dom";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const Login = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const { login } = useAuth();

  async function loginUser() {
    try {
      setError("");
      setLoading(true);
      await login(user.email, user.password);
      history.push("/home");
    } catch (err) {
      console.log(err);
      setError("Fallo al acceder");
    }
    setLoading(false);
  }

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Box
      marginTop="5%"
      display="flex"
      flexDirection="row"
      justifyContent="center"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            alignItems="center"
          >
            <DirectionsBusIcon sx={{ fontSize: 100 }} />
            <Typography fontSize="4em">{"Lobito"}</Typography>
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
            <Button
              disabled={loading}
              variant="contained"
              onClick={() => {
                loginUser();
              }}
              size="large"
            >
              {"Acceder"}
            </Button>
            <br></br>
            <Typography>
              {"¿No tienes una cuenta? "}
              <Link to="/signup">Registrate</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
