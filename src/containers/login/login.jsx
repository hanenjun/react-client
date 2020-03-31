import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button } from 'antd-mobile'
export default class Register extends Component {
    constructor(props){
        super(props)
    }
    state = {
        username:"",
        password:"",
    }
    login = () =>{
        console.log(this.state)
        // Toast
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    render() {
        return (
            <div>
                <NavBar>直&nbsp;聘</NavBar>
                <Logo></Logo>
                <WingBlank>
                    <List>
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