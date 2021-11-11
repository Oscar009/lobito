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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory, useRouteMatch } from "react-router";
import TopBar from "../topBar/TopBar";

const Browser = () => {
  const [showTable, setShowTable] = useState(false);
  const [schedules, setSchedules] = useState(["7:00 AM", "8:00 AM", "9:00 AM"]);

  let history = useHistory();
  const { url } = useRouteMatch();

  const dataLoad = () => {
    setSchedules([{hour:"7", min:"00"}, {hour:"7", min:"30"}, ]);
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
    backgroundColor: "#DFD3C3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "25px",
  };

  return (
    <Box>
      <TopBar/>
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
           Crear y editar horarios
          </Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow backgroundColor="primary" style={styleHead}>Horarios disponibles</TableRow>
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
                    <TableCell>{`${schedule.hour}:${schedule.min}`}</TableCell>
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
