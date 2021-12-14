import { useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import emailjs from "emailjs-com";
import { routes } from "../constants/routes";
import About from "./about";
import Home from "./home";
import Contact from "./contact";
import AboutUs from "./aboutUs";
import Finding from "./Finding";
import Politics from "./politics";
// init("user_6jARMg7P8wTNLTtJh1WLZ");

export default function Router() {
  const history = useHistory();

  return (
    <Switch>
      <Route path={routes.home} exact>
        <Home />
      </Route>
      <Route path={routes.about} exact>
        <About />
      </Route>
      <Route path={routes.politics} exact>
        <Politics />
      </Route>
      <Route path={routes.contact} exact>
        <Contact />
      </Route>
      <Route path={routes.aboutUs} exact>
        <AboutUs />
      </Route>
      <Route path={routes.start_search} exact>
        <Finding />
      </Route>
      <Redirect from="/" to="/main" />
    </Switch>
  );
}
