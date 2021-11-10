import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Box } from "@mui/system";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@mui/material/Alert";

const Home = () => {
  const [error, setError] = useState("");

  let history = useHistory();

  const { currentUser, logOut } = useAuth();

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      history.push("/");
    } catch {
      setError("Error al intenar salir");
    }
  };

  return (
    <Box
      marginTop="8%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <br></br>
      {error && (
        <div>
          <Alert severity="error">{error}</Alert>
          <br></br>
        </div>
      )}
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>HOME </Typography>
        <Typography>{currentUser.email} </Typography>
        <Button onClick={handleLogOut}>Cerrar sesión</Button>
      </Box>
      <Box display="flex" flexDirection="row" alignContent="center">
        <Button onClick={() => history.push("/schedules")}>
          Horarios Admin
        </Button>
        <Button onClick={() => history.push("/schedules")}>Horarios</Button>
        <Button onClick={() => history.push("/schedules")}>Perfil</Button>
      </Box>
    </Box>
  );
};

export default Home;
