import { Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { Box } from "@mui/system";
import { useAuth } from "../contexts/AuthContext";
import TopBar from "../topBar/TopBar";

const Home = () => {

  let history = useHistory();

  const { currentUser} = useAuth();

  return (
    <div>
    <TopBar />
    <br></br>
    <Box
      marginTop="8%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{currentUser.email} </Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignContent="center">
        <Button onClick={() => history.push("/schedules")}>
          Horarios Admin
        </Button>
        <Button >Temperaturas admin</Button>
        <Button >Horarios Disponibles</Button>
      </Box>
    </Box>
    </div>
  );
};

export default Home;
