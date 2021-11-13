import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { unSuscribe, currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return (unSuscribe && currentUser) ? <Component {...props} /> : <Redirect to="/" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
