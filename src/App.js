import "./App.css";
import Schedules from "./components/schedules";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/login/Login";
import AdapterLuxon from "@mui/lab/AdapterLuxon"; 
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Signup from "./components/login/Signup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0288d1",
    },
    secondary: {
      main: "#d32f2f",
    },
  },
});

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="/schedules" component={Schedules} />
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
