import * as React from "react";
import { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import ZarsimLc from "../ZarsimLc";
import { Layout } from "../layout/Layout";
import Opening from "../opening/Opening";
import Carry from "../carry/Carry";
import Payment from "../payment/Payment";

export default class AppRouter extends Component<any, any> {
  public render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={ZarsimLc} />
          <Route path="opening" component={Opening} />
          <Route path="carry" component={Carry} />
          <Route path="payment" component={Payment} />
        </Route>
      </Router>
    );
  }
}