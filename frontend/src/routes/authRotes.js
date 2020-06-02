import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import SignIn from '../pages/auth/signIn';
import SignUp from "../pages/auth/signUp";

export default function AuthRouter() {
  
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/login"/>}/>
        <Route path="/login" component={SignIn} />
        <Route path="/register" component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}