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
import { useHistory, useRouteMatch } from "react-router";
import TopBar from "../topBar/TopBar";
import firebase from "../../firebase";

const db = firebase.database();

const Browser = () => {
  const [showTable, setShowTable] = useState(false);
  const [schedules, setschedules] = useState([]);

  let history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    const ref = db.ref("/schedules");
    ref.on(
      "value",
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          console.log(childKey, childData);
          let row = {
            key: childKey,
            hour: childData.hour,
            min: childData.min,
          }
          schedules.push(row);
        });
        setShowTable(true);
      },
    );
    return () => ref.off(); 
  }, [schedules]);

  const styleHead = {
    backgroundColor: "#DFD3C3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "25px",
  };

  return (
    <Box>
      <TopBar isReturnVisible={true} />
      <Box
        marginTop="15%"
        display="flex"
        flexDirection="row-reverse"
        justifyContent="space-between"
      >
        <IconButton
          onClick={() => {
            history.push({
              pathname: `${url}/add`,
              state: {
                action: "add",
              },
            });
          }}
        >
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
          <Typography>Crear y editar horarios</Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table
              style={{
                borderCollapse: "separate",
                borderSpacing: "10px 0px",
              }}
            >
              <TableHead>
                <TableRow backgroundColor="primary" style={styleHead}>
                  Horarios disponibles
                </TableRow>
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
