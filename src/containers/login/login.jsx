import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button } from 'antd-mobile'
class Login extends Component {
    constructor(props){
        super(props)
    }
    state = {
        username:"",
        password:"",
    }
    login = () =>{
        this.props.login(this.state)
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    render() {
        let {msg,redirectTo} = this.props.user
        console.log(msg)
        if(redirectTo){
          return  <Redirect to={redirectTo}></Redirect>
        }
        return (
            <div>
                <NavBar>直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
                 {msg?<div className="error-msg">{msg}</div>:null}

                        <InputItem  placeholder="请输入用户名" onChange={v=>{this.handleChange("username",v)}}>用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem  onChange={v=>{this.handleChange("password",v)}} placeholder="请输入密码" type="password">密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={()=>{this.props.history.replace("/register")}}>注册</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.login}>登入</Button>
                </WingBlank>
            </div>
        )
    }
}

export default  connect(
    state=>({user:state.user}),
    {login}
)(Login)