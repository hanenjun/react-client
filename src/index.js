import React from 'react'
import ReactDom from 'react-dom'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'
import { HashRouter, Route, Switch ,BrowserRouter} from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
ReactDom.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route component={Main}></Route>
            </Switch>
        </BrowserRouter>
    </Provider>

), document.getElementById("root"))