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
import InfoIcon from "@mui/icons-material/Info";
import { useHistory, useRouteMatch } from "react-router";
import TopBar from "../topBar/TopBar";
import firebase from "../../firebase";
import { useAuth } from "../contexts/AuthContext";

const db = firebase.database();

const Browser = () => {
  const [showTable, setShowTable] = useState(false);
  const [schedules] = useState([]);
  const [isNotselected, setIsNotSelected] = useState(false);
  const [user, setUser] = useState({});

  let history = useHistory();
  const { url } = useRouteMatch();
  const { currentUser } = useAuth();

  useEffect(() => {
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
    /* return () => ref.off(); */
    const refUser = db.ref("/users");
    refUser.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        if(currentUser.email === childData.email){
          let row = {
            keyUser: childKey,
            email: childData.email,
            horario: childData.horario,
          };
          setUser(row);
        }
      });
      setShowTable(true);
    });
  }, [currentUser.email, schedules]);

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
          marginTop="10%"
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
                {schedules.map((schedule, i) => (
                  <TableRow
                    hover
                    key={schedule.id}
                    onClick={() => {
                      if(!isNotselected){
                        history.push({
                          pathname: `${url}/details`,
                          state: {
                            selected: { schedule },
                            action: "view",
                            idKey: schedule.key,
                          },
                        });  
                      }
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
