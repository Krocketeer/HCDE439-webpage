import React from "react";
import { Route, Switch } from 'react-router-dom';
import About from "./About"
import Home from "./Home"
import ProjectTemplate from './projects/ProjectTemplate'
import Blink from "./projects/Blink"
import Fade from "./projects/Fade"
import InputOutput from "./projects/InputOutput";
import Libraries from "./projects/Libraries"
import HigherVoltage from "./projects/HigherVoltage";
import WebCom from "./projects/WebCom"
import LightBar from "./projects/LightBar"

export default function Routing() {
    return <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" exact component={About} />
        <Route path="/temp" exact component={ProjectTemplate} />
        <Route path="/blink" exact component={Blink} />
        <Route path="/fade" exact component={Fade} />
        <Route path="/inputoutput" exact component={InputOutput} />
        <Route path="/libraries" exact component={Libraries} />
        <Route path="/highervoltage" exact component={HigherVoltage} />
        <Route path="/webcom" exact component={WebCom} />
        <Route path="/lightbar" exact component={LightBar} />
        <Route path="*" component={Home}/>
    </Switch>
}