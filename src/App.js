import "./App.css";
import Schedules from "./components/schedules";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/login/Login";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Signup from "./components/login/Signup";
import {AuthProvider} from "./components/contexts/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Profile from "./components/profile/Profile";
import schedulesDetails from "./components/schedulesDetails";
import Temperatures from "./components/temperatures/Temperatures"

const theme = createTheme({
  palette: {
    primary: {
      main: "#5AA897",
    },
    secondary: {
      main: "#F05945",
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
              <PrivateRoute path="/schedules" component={Schedules} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/schedulesDetails" component={schedulesDetails} />
              <PrivateRoute path="/temperatures" component={Temperatures} />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
