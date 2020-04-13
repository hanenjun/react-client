import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Button } from 'antd-mobile'
import { sendMsg } from '../../redux/actions'
const Item = List.Item
class Chat extends Component {
    state = {
        content: ''
    }
    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({ to, from, content })
        }
        this.setState({ content: '' })
    }
    render() {
        const { users, chatMsgs } = this.props.chat

        const { user } = this.props
        const meId = user._id;
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        const {header} = users[targetId]
        console.log( users[targetId])
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetIcon=header?require(`../../assets/images/${header}.png`):null
        return (
            <div id='chat-page'>
                <NavBar>aaaa</NavBar>
                <List>
                    {msgs.map(msg => {
                        console.log(msg)
                        console.log(meId,msg.from)
                        if (meId === msg.from) {
                            return (
                                <Item key={msg._id} className={'chat-me'} extra={<img src={targetIcon}></img>} >
                                {msg.content}
                            </Item>
                              
                            )
                        } else {
                            return (
                                <Item thumb={targetIcon} key={msg._id}>
                                {msg.content}
                                    </Item>
                            )
                        }
                    })}
                </List>
                <div className='am-tab-bar'>
                    <InputItem value={this.state.content} onChange={val => this.setState({ content: val })} placeholder='请输入' extra={<span onClick={this.handleSend}>发送</span>}></InputItem>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat)