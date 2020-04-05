import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderSelector from '../../components/header-selector/header-selector'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, TextareaItem } from 'antd-mobile'
class LaobanInfo extends Component {
    state = {
        header:"",
        post:"",
        info:"",
        company:"",
        salary:""
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
                <NavBar>老板信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <InputItem placeholder='请输入职位' onChange={v=>{this.handleChange("post",v)}}>招聘职位：</InputItem>
                <InputItem placeholder='请输入公司名称' onChange={v=>{this.handleChange("company",v)}}>公司名称：</InputItem>
                <InputItem placeholder='请输入薪资' onChange={v=>{this.handleChange("salary",v)}}>职位薪资：</InputItem>
                <TextareaItem title="职位要求：" row={3} onChange={v=>{this.handleChange("info",v)}}></TextareaItem>
                <Button type="primary"onClick={this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(LaobanInfo)