import {
  Alert,
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box } from "@mui/system";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const TopBar = (props) => {
  const [error, setError] = useState("");
  const [isSignOut, setIsSignOut] = useState(false);

  let history = useHistory();

  const { logOut } = useAuth();

  async function handleLogOut() {
    setError("");

    try {
      await logOut()
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      history.push("/");
    } catch {
      setError("Error al intenar salir");
    }
  }
  return (
    <Box>
      <AppBar position="fixed" elevation={5}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            {props.isReturnVisible && (
              <IconButton
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowBackIcon fontSize="large" style={{ color: "#000" }} />
              </IconButton>
            )}
            <br></br>
            <br></br>
            <DirectionsBusIcon fontSize="large" />
            <Typography margin="1%" fontSize="30px">
              {"LOBITO"}
            </Typography>
            <br></br>
          </Box>
          {error && (
            <div>
              <Alert severity="error">{error}</Alert>
              <br></br>
            </div>
          )}
          <Box>
            <IconButton
              onClick={() => {
                history.push("/profile");
              }}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={() => {
                setIsSignOut(true);
              }}
            >
              <ExitToAppIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Dialog open={isSignOut} onClose={() => setIsSignOut(false)}>
        <DialogTitle>{"Sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"¿Seguro que quiere cerrar sesión?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleLogOut}>
            <CheckCircleIcon fontSize="large"  />
          </IconButton>
          <IconButton onClick={() => setIsSignOut(false)}>
            <CancelIcon fontSize="large"  />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TopBar;
