/* eslint-disable import/no-anonymous-default-export */
import { Login } from "@mui/icons-material";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Signup from "./Signup";

export default (props) => {
  const {url} = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${url}/signup`}> <Signup/></Route>

        <Route exact path={url}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
};