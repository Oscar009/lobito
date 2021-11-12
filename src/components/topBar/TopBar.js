import { Alert, AppBar, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box } from "@mui/system";

const TopBar = () => {
  const [error, setError] = useState("");

  let history = useHistory();

  const { logOut } = useAuth();

  async function handleLogOut() {
    setError("");

    try {
      await logOut();
      history.push("/");
    } catch {
      setError("Error al intenar salir");
    }
  }
  return (
    <Box >
      <AppBar position="fixed" elevation={5} marginBottom="10%">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography margin="1%" fontSize="30px">
            {"LOBITO"}
          </Typography>
          <br></br>
          {error && (
            <div>
              <Alert severity="error">{error}</Alert>
              <br></br>
            </div>
          )}
          <Box>
            <IconButton onClick={()=>{history.push("/profile")}}>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <IconButton  onClick={handleLogOut}>
              <ExitToAppIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
    </Box>
  );
};

export default TopBar;
