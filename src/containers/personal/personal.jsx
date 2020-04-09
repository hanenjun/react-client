import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;
 class Personal extends Component {
    render(){
        return (
            <div>
                <Result img={<img src={require('../../assets/images/头像1.png')} style={{width:50}} alt='header'></img>} title='张三' message='ibm'/>
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <WhiteSpace></WhiteSpace>
                        <Brief>职位</Brief>
                        <WhiteSpace></WhiteSpace>
                        <Brief>职位</Brief>
                        <WhiteSpace></WhiteSpace>
                        <Brief>职位</Brief>
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button>退出登入</Button>
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(Personal)