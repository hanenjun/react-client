import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button,Modal } from 'antd-mobile'
import Cookies  from 'js-cookie' 
import {resetUser} from '../../redux/actions'
const Item = List.Item;
const Brief = Item.Brief;
class Personal extends Component {
    logout =() =>{
        Modal.alert('退出',"确认退出登入吗?",[
            {
                text:"取消",
                onPress:()=> console.log('cancel')
            },
            {
                text:"确认",
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const { username, type, header, post, info, salary, company } = this.props.user
        return (
            <div>
                <Result img={<img src={require(`../../assets/images/${header}.png`)} style={{ width: 50 }} alt='header'></img>} title={username} message={company} />
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <WhiteSpace></WhiteSpace>
                        <Brief>职位：{post}</Brief>
                        <WhiteSpace></WhiteSpace>
                        <Brief>简介：{info}</Brief>
                        <WhiteSpace></WhiteSpace>
                       {salary? <Brief>薪资：{salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button type='warning' onClick={this.logout}>退出登入</Button>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user }),
    {resetUser}
)(Personal)