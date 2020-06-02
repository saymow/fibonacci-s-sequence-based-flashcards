import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Main from "../pages/main";
import AddCards from "../pages/addCards";
import ChangePassword from "../pages/changePassword";
import Practice from "../pages/practice";

export default function AppRouter() {


  return(
    <BrowserRouter>
      <Redirect to={{pathname: "/"}}/>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/addCards/:deckName" component={AddCards} params/>
        <Route path="/change_password" component={ChangePassword}/> 
        <Route path="/practice/:deckName" component={Practice} />
      </Switch>
    </BrowserRouter>
  )
}