//rafce
import { MobileTimePicker } from "@mui/lab";
import { IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const Form = () => {
  const [value, setValue] = useState(new Date("2021-01-01T00:00:00.000Z"));

  const location = useLocation();

  let history = useHistory();
  let action = location.state.action;

  return (
    <Box>
      <IconButton
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon fontSize="large" style={{ color: "#000" }} />
      </IconButton>
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
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <br></br>
          {action === "update" && (
            <IconButton styles={{ margin: "20px" }}>
              <DeleteIcon fontSize="large" color="secondary" />
            </IconButton>
          )}
          <br></br>
          <IconButton styles={{ margin: "20px" }}>
            <CancelIcon fontSize="large" color="secondary" />
          </IconButton>
          <IconButton styles={{ margin: "20px" }}>
            <SaveIcon fontSize="large" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
