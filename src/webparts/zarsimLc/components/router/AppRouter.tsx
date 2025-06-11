import * as React from "react";
import { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import ZarsimLc from "../ZarsimLc";
import { Layout } from "../layout/Layout";
import Openning from "../openning/Openning";
import Carry from "../carry/Carry";
import Payment from "../payment/Payment";

export default class AppRouter extends Component<any, any> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={ZarsimLc} />
          <Route path="openning" component={Openning} />
          <Route path="carry" component={Carry} />
          <Route path="payment" component={Payment} />
        </Route>
      </Router>
    );
  }
}