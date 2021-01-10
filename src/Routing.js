import React from "react";
import { Route, Switch } from 'react-router-dom';
import About from "./About"
import Home from "./Home"
import ProjectTemplate from './projects/ProjectTemplate'

export default function Routing() {
    return <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About} />
        <Route path="/blink" exact component={ProjectTemplate} />
        <Route path="*" component={Home}/>
    </Switch>
}