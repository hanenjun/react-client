import cookies from 'js-cookie'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route ,Switch} from 'react-router-dom'
import { getRedirectTo } from '../../utils/index'
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'
import dashenInfo from '../dashen-info/dashen-info'
import laobanInfo from '../laoban-info/laoban-info'
import {getUser} from '../../redux/actions'
import DaShen from '../dashen/dashen'
import LaoBan from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NoteFound from '../../components/not-found/not-found'
import Chat from '../chat/chat'
class Main extends Component {
    navList=[
       
        {
            path:'/laoban',
            component:LaoBan,
            title:"大神列表",
            icon:"dashen",
            text:"大神"
        },
        {
            path:'/dashen',
            component:DaShen,
            title:"老板列表",
            icon:"laoban",
            text:"老板"
        },
        {
            path:'/message',
            component:Message,
            title:"消息列表",
            icon:"message",
            text:"消息"
        },
        {
            path:'/personal',
            component:Personal,
            title:"用户中心",
            icon:"personal",
            text:"个人"
        },
    ]
    constructor(props){
        super(props)
    }
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
        let {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find((item)=> item.path == path)
        if(currentNav){
            if(user.type==='laoban'){
                navList[1].hide = 'true'
            }else{
                navList[0].hide = 'true'
            }
        }
        navList = navList.filter(item=>!item.hide)
        
        console.log(this.props.unReadCount)
        return (
            <div>
                {currentNav?  <NavBar className='stick-header'>{currentNav.title}</NavBar>:null}

                <Switch>
                    <Route path='/dasheninfo' component={dashenInfo}></Route>
                    <Route path='/laobaninfo' component={laobanInfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>
                    {this.navList.map(item=>{
                       return(
                            <Route key={item} path={item.path} component={item.component}></Route>
                        )
                    })}
                    <Route component={NoteFound}></Route>
                </Switch>
                
                {currentNav?  <NavFooter navList={navList} unReadCount={this.props.unReadCount}></NavFooter>:null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user,unReadCount:state.chat.unReadCount }),
    {getUser}
)(Main)