//rafce
import { MobileTimePicker } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TopBar from "../topBar/TopBar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import firebase from "../../firebase"

const db = firebase.database();

const Form = () => {
  const [value, setValue] = useState(new Date());
  const [isDelete, setIsDelete] = useState(false);

  const location = useLocation();

  let history = useHistory();
  let action = location.state.action;

  const postNewSchedule = () =>{
    const schedulesRef= db.ref("schedules");
    let newHour = {
      hour: value.getHours(),
      min: value.getMinutes(),
    }
    schedulesRef.push(newHour);
  }

  const dataLoad = () => {
    if (action === "update") {
      let d = new Date();
      d.setHours(
        parseInt(location.state.selected.schedule.hour),
        parseInt(location.state.selected.schedule.min)
      );
      setValue(d);
    }
  };

  useEffect(() => {
    dataLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box marginTop="15%">
      <TopBar isReturnVisible={true} />
      <Box>
        <Box
          marginTop="10%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="3rem">
            {action === "add" ? "Agregar" : "Editar"}
          </Typography>
          <br></br>
          <MobileTimePicker
            label="Seleccionar horario"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <br></br>
            {action === "update" && (
              <IconButton
                onClick={() => setIsDelete(true)}
                styles={{ margin: "20px" }}
              >
                <DeleteIcon fontSize="large" color="secondary" />
              </IconButton>
            )}
            <br></br>
            <IconButton
              onClick={() => history.goBack()}
              styles={{ margin: "20px" }}
            >
              <CancelIcon fontSize="large" color="secondary" />
            </IconButton>
            <IconButton styles={{ margin: "20px" }} onClick={() => {
              postNewSchedule();
              history.goBack();
              }}>
              <SaveIcon fontSize="large" color="primary" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Dialog open={isDelete} onClose={() => setIsDelete(false)}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"¿Seguro que quiere eliminar este elemento?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton>
            <CheckCircleIcon
              fontSize="large"
              onClick={() => {
                console.log("Horario eliminado");
                setIsDelete(false);
                history.goBack();
              }}
            />
          </IconButton>
          <IconButton>
            <CancelIcon fontSize="large" onClick={() => setIsDelete(false)} />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;
