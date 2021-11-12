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
import Profile from "./components/profile/Profile";

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
              <Route path="/schedules" component={Schedules} />
              <Route path="/profile" component={Profile} />
            </BrowserRouter>
          </ThemeProvider>
        </LocalizationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
