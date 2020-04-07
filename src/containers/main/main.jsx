import cookies from 'js-cookie'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { getRedirectTo } from '../../utils/index'
import dashenInfo from '../dashen-info/dashen-info'
import laobanInfo from '../laoban-info/laoban-info'
import {getUser} from '../../redux/actions'
class Main extends Component {
    componentDidMount() {
        let userid = cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
        this.props.getUser()
        }
    }
    render() {
        const { user } = this.props
        // if (!user._id) {
        //     return <Redirect to={'/login'}></Redirect>
        // }
        let userid = cookies.get('userid')
        if (!userid) {

            return <Redirect to={'/login'}></Redirect>
        }

        if (!user._id) {
            
            return null
        } else {

            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)

                return <Redirect to={path}></Redirect>
            }
        }
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

export default connect(
    state => ({ user: state.user }),
    {getUser}
)(Main)