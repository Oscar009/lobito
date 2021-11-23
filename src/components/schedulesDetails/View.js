import {
  Typography,
  Checkbox,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TopBar from "../topBar/TopBar";
import { useLocation } from "react-router";
import firebase from "../../firebase";
import { useAuth } from "../contexts/AuthContext";

const db = firebase.database();

const View = () => {
  const { currentUser } = useAuth();

  let location = useLocation();
  let key = location.state.idKey;

  const [checked, setChecked] = useState(false);
  const [schedule, setSchedule] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const ref = db.ref("/schedules");
    ref.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childKey === key) {
          let row = {
            key: childKey,
            hour: childData.hour,
            min: childData.min,
            available: 10,
          };
          setSchedule(row);
        }
      });
    });
    const ref1 = db.ref("/users");
    ref1.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if (childData.email === currentUser.email) {
          let row = {
            key: childKey,
            email: childData.email,
            horario: childData.horario,
          };
          setUser(row);
        }
      });
    });
  }, [currentUser.email, key]);

  return (
    <div>
      <TopBar isReturnVisible={true} />
      <Box
        marginTop="5%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Card elevation={10}>
          <CardMedia>
            <img
              height="300"
              src="https://image.freepik.com/vector-gratis/ilustracion-vector-codigo-qr_110233-1208.jpg"
              alt=""
            />
          </CardMedia>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                {"Hora:"} {schedule.hour}:{schedule.min}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {"Lugares disponibles: "}
                {schedule.available}
                {user.email}
              </Typography>
            </Box>
            <br></br>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>{"Apartar lugar:"}</Typography>
              <Checkbox
                size="large"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </Box>
          </CardContent>
        </Card>

        <Typography></Typography>
      </Box>
    </div>
  );
};

export default View;
