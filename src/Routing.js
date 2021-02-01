import React from "react";
import { Route, Switch } from 'react-router-dom';
import About from "./About"
import Home from "./Home"
import ProjectTemplate from './projects/ProjectTemplate'
import Blink from "./projects/Blink"
import Fade from "./projects/Fade"
import InputOutput from "./projects/InputOutput";

export default function Routing() {
    return <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About} />
        <Route path="/temp" exact component={ProjectTemplate} />
        <Route path="/blink" exact component={Blink} />
        <Route path="/fade" exact component={Fade} />
        <Route path="/inputoutput" exact component={InputOutput} />
        <Route path="*" component={Home}/>
    </Switch>
}