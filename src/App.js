import "./App.css";
import Schedules from "./components/schedules";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/login/Login";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Signup from "./components/login/Signup";
import AuthProvider from "./components/contexts/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

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
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Route exact path="/" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/home" component={Home} />
              <Route path="/schedules" component={Schedules} />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
