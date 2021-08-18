import { AppBar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import dog from '../dog.png'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./Header";
import About from "./About";
import Contact from "./Contact";
import Projects from "./Projects";
import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  root: {

    
  },
}))
export default function App() {
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <Grid direction="row">
        <Header />
        <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path={["/Projects"]} component={Projects} />
          <Route exact path={["/About"]} component={About} />
          <Route exact path="/Contact" component={Contact} />
        </Switch>
      </Grid>

    </div>
  );
}

