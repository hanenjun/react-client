import React from 'react'
import ReactDom from 'react-dom'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'
import { HashRouter, Route, Switch } from 'react-router-dom'
ReactDom.render((
    <HashRouter>
        <Switch>
            <Route paht="/login" component={Login}></Route>
            <Route paht="/register" component={Register}></Route>
            <Route component={Main}></Route>
        </Switch>
    </HashRouter>
), document.getElementById("root"))