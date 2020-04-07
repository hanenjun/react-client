import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderSelector from '../../components/header-selector/header-selector'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, TextareaItem } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import {updataUser} from '../../redux/actions'

class DashenInfo extends Component {
    state = {
        header:"",
        post:"",
        info:"",
    }
    setHeader = (header) =>{
        this.setState({
            header:header
        })
        console.log(this.state)
    }
    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    save=()=>{
        this.props.updataUser(this.state)
    }
    render() {
        const {header,type} = this.props.user
        if(header){
            const path = type === "dashen" ? '/dashen' : 'laoban'
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <InputItem placeholder='请输入岗位'  onChange={v=>{this.handleChange("post",v)}}>求职岗位：</InputItem>
                <TextareaItem title="请输入个人介绍:" row={3} onChange={v=>{this.handleChange("info",v)}}></TextareaItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {updataUser}
)(DashenInfo)