import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory, useRouteMatch } from "react-router";

const Browser = () => {
  const [showTable, setShowTable] = useState(false);
  const [schedules, setSchedules] = useState(["7:00 AM", "8:00 AM", "9:00 AM"]);

  let history = useHistory();
  const { url } = useRouteMatch();

  const dataLoad = () => {
    /* axios
      .get(" https://api.foursquare.com/v2/venues/VENUE_ID/hours")
      .then((response) => {
        setSchedules(response);
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  useEffect(() => {
    dataLoad();
    if (schedules.length) {
      setShowTable(true);
    }
    setShowTable(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleHead = {
    backgroundColor: "#5DADE2",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "25px",
  };

  return (
    <Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <IconButton
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon fontSize="large" style={{ color: "#000" }} />
        </IconButton>
        <IconButton onClick={() => {
              history.push({
                pathname: `${url}/add`,
                state: {
                  action: "add",
                },
              });
            }}>
          <AddCircleIcon fontSize="large" style={{ color: "#000" }} />
        </IconButton>
      </Box>
      {showTable && (
        <Box
          display="flex"
          flexDirection="column"
          JustifyContent="center"
          alignItems="center"
        >
          <Typography >
            Selecciona un horario tocando la fila para ver los detalles
          </Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={styleHead}>Horarios disponibles</TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, i) => (
                   <TableRow
                    hover
                    key={schedule.id}
                    onClick={() => {
                      history.push({
                        pathname: `${url}/update`,
                        state: {
                          selected: { schedule },
                          action: "update",
                        },
                      });
                    }}
                  >
                    <TableCell>{schedule}</TableCell>
                  </TableRow> 
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {!showTable && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          style={{ margin: "10px" }}
        >
          <InfoIcon />
          <Typography>No hay elementos por mostrar</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Browser;
