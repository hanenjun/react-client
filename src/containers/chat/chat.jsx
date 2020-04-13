import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Button} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'
const Item = List.Item
 class Chat extends Component {
     state  = {
        content:''
     }
    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if(content){
            this.props.sendMsg({to,from,content})
        } 
        this.setState({content:''})
    }
    render(){
        return (
            <div id='chat-page'>
                <NavBar>aaaa</NavBar>
                <List>
                    <Item thumb={require('../../assets/images/头像1.png')}>
                        hi
                    </Item>
                    <Item thumb={require('../../assets/images/头像1.png')}>
                        hi
                    </Item>

                    <Item className={'chat-me'} extra={<img src={require('../../assets/images/头像1.png')}></img>} >
                        hi
                    </Item>
                    <Item className={'chat-me'} extra={<img src={require('../../assets/images/头像1.png')}></img>} >
                        hi
                    </Item>
                </List>
                <div className='am-tab-bar'>
                    <InputItem value={this.state.content} onChange={val => this.setState({content:val})}  placeholder='请输入' extra={<span onClick={this.handleSend}>发送</span>}></InputItem>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({user:state.user}),
    {sendMsg}
)(Chat)