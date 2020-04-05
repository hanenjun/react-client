import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderSelector from '../../components/header-selector/header-selector'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, TextareaItem } from 'antd-mobile'
class DashenInfo extends Component {
    state = {
        header:"",
        post:"",
        company:"",
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
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <NavBar>大神信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <InputItem placeholder='请输入岗位'  onChange={v=>{this.handleChange("post",v)}}>求职岗位：</InputItem>
                <InputItem placeholder='请输入个人介绍'  onChange={v=>{this.handleChange("company",v)}}>个人介绍：</InputItem>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(DashenInfo)