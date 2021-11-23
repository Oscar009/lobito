/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Browser from "./Browser";
import View from "./View";

export default (props) => {
  const {url} = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${url}/details`}> <View/></Route>

        <Route exact path={url}>
          <Browser />
        </Route>
      </Switch>
    </div>
  );
};