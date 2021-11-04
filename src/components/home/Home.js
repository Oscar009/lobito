import { Button, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { Box } from "@mui/system";

const Home = () => {
  let history = useHistory();
  return (
    <Box
      marginTop="10%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography>HOME</Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
      >
        <Button onClick={() => history.push("/schedules")}>Horarios Admin</Button>
        <Button onClick={() => history.push("/schedules")}>Horarios</Button>
        <Button onClick={() => history.push("/schedules")}>Perfil</Button>
      </Box>
    </Box>
  );
};

export default Home;
