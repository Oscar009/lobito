import {
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
import firebase from "../../firebase";
import TopBar from "../topBar/TopBar";
import InfoIcon from "@mui/icons-material/Info";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const db = firebase.database();

const Temperatures = () => {
  const [showTable, setShowTable] = useState(false);
  const [temperatures] = useState([]);

  let history = useHistory();
  const { currentUser } = useAuth();

/*   useEffect(() => {
    if (currentUser.email !== "oortizbarba@gmail.com") {
      history.push("/home");
    }
    const ref = db.ref("/schedules");
    ref.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        let row = {
          key: childKey,
          hour: childData.hour,
          min: childData.min,
        };
        schedules.push(row);
      });
      setShowTable(true);
    });
    return () => ref.off();
  }, [schedules, currentUser.email, history]); */

  const styleHead = {
    backgroundColor: "#DFD3C3",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "25px",
  };

  return (
    <Box>
      <TopBar isReturnVisible={true} />
      {showTable && (
        <Box
          display="flex"
          flexDirection="column"
          JustifyContent="center"
          alignItems="center"
          marginTop="15%"
        >
          <br></br>
          <Typography>Ver y apartar un horario</Typography>
          <br></br>
          <TableContainer component={Paper}>
            <Table
              style={{
                borderCollapse: "separate",
                borderSpacing: "10px 0px",
              }}
            >
              <TableHead>
                <TableRow style={styleHead}>Horarios disponibles</TableRow>
              </TableHead>
              <TableBody>
                {temperatures.map((temp, i) => (
                  <TableRow key={temp.id}>
                    <TableCell>{`${temp.hour}:${temp.min}`}</TableCell>
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
          marginTop="20%"
        >
          <InfoIcon />
          <Typography>No hay elementos por mostrar</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Temperatures;
