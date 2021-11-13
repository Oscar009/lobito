import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import TopBar from "../topBar/TopBar";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <TopBar isReturnVisible={true} />
      <br></br>
      <br></br>
      <br></br>
      <Box display="flex" flexDirection="column" alignItems="center">
        <br></br>
        <Typography fontSize="3rem">Usuario</Typography>
        <br></br>
        <img
          width="200px"
          heigth="200px"
          alt=""
          src="https://as1.ftcdn.net/v2/jpg/04/61/75/24/1000_F_461752472_kp6NVlbXhXqotuXyNLd2mc8OUw6EIebu.jpg"
        />
        <br></br>
        <Typography>
          Correo: {currentUser.email ? currentUser.email : ""}
        </Typography>
      </Box>
    </div>
  );
};

export default Profile;
