import React,{Component} from 'react'
import dashenInfo from '../dashen-info/dashen-info'
import laobanInfo from '../laoban-info/laoban-info'
import {Route,Switch,NavLink} from 'react-router-dom'
export default class Main extends Component {
    render(){
        return (
            <div>
            <switch>
                <Route path='/dasheninfo' component={dashenInfo}></Route>
                <Route path='/laobaninfo' component={laobanInfo}></Route>
            </switch>
            </div>
        )
    }
}