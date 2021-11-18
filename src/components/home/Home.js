import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Box } from "@mui/system";
import TopBar from "../topBar/TopBar";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  let history = useHistory();
  const [isAdmin, setIsadmin] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser.email === "oortizbarba@gmail.com") {
      setIsadmin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <TopBar />
      <br></br>
      <Box marginTop="15%" marginBottom="5%" display="grid">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Grid item xs={3}>
            <Card elevation={10}>
              <CardActionArea>
                <CardMedia>
                  <img
                    height="300"
                    src="https://image.freepik.com/vector-gratis/ilustracion-reloj_53876-5578.jpg"
                    alt=""
                  />
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Horarios Disponibles
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pulsa aquí y toma un horario de camión
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {isAdmin && (
            <Grid item xs={3}>
              <Card elevation={10}>
                <CardActionArea onClick={() => history.push("/schedules")}>
                  <CardMedia>
                    <img
                      height="300"
                      src="https://image.freepik.com/vector-gratis/hombre-negocios-encima-reloj_23-2147618185.jpg"
                      alt=""
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Horarios Admin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Administra horarios disponibles
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
          {isAdmin && (
            <Grid item xs={3}>
              <Card elevation={10}>
                <CardActionArea>
                  <CardMedia>
                    <img
                      height="300"
                      src="https://image.freepik.com/vector-gratis/comprobacion-temperatura-corporal_23-2148505079.jpg"
                      alt=""
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Temperaturas admin
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Log de temperaturas
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )}
        </Grid>
        <Box display="flex" flexDirection="row" alignItems="center"></Box>
      </Box>
    </div>
  );
};

export default Home;
