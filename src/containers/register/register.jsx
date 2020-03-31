import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, Radio,Toast } from 'antd-mobile'
const ListItem = List.Item
export default class Register extends Component {
    constructor(props){
        super(props)
    }
    state = {
        username:"",
        password:"",
        password2:"",
        type:""
    }
    register = () =>{
        console.log(this.state)
        Toast
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
                        <InputItem placeholder="请输入用户名" onChange={v=>{this.handleChange("username",v)}}>用户名：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem placeholder="请输入密码" type="password"  onChange={v=>{this.handleChange("password",v)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem placeholder="请确认密码" type="password"  onChange={v=>{this.handleChange("password2",v)}}>确认密码：</InputItem>
                        <WhiteSpace></WhiteSpace>
                       <ListItem>
                           <span>用户类型</span>
                           &nbsp;&nbsp;&nbsp;
                           <Radio onChange={()=>this.handleChange("type","dashen")} checked={this.state.type === "dashen" ? true:false}>大神</Radio>
                           &nbsp;&nbsp;&nbsp;
                           <Radio onChange={()=>this.handleChange("type","laoban")} checked={this.state.type === "laoban" ? true:false}>老板</Radio>
                       </ListItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button type="primary" onClick={this.register}>注册</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={()=>{this.props.history.replace("/login")}}>登入</Button>
                </WingBlank>
            </div>
        )
    }
}