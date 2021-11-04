/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Browser from "./Browser";
import Form from "./Form";

export default (props) => {
  const {url} = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${url}/add`}> <Form/></Route>

        <Route path={`${url}/update`}> <Form /></Route>

        <Route exact path={url}>
          <Browser />
        </Route>
      </Switch>
    </div>
  );
};