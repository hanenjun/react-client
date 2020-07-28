import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief



class Message extends Component {
    constructor(props){
        super(props)
    }
    getListMsga(msgs,userid) {
        const lastMsgObjs = {}
        msgs.forEach(msg => {
            if(msg.to===userid&&!msg.read){
            msg.unReadCount = 1
            }else{
            msg.unReadCount = 0
            }
            const chatId = msg.chat_id
            const lastmsg = lastMsgObjs[chatId]
            if (!lastmsg) {
                lastMsgObjs[chatId] = msg
            } else {
                const unReadCount = lastmsg.unReadCount
                if (msg.create_time > lastmsg.create_time) {
                    lastMsgObjs[chatId] = msg
                }
                lastMsgObjs[chatId].unReadCount = msg.unReadCount+unReadCount
            }
        })
        const lastMsgs = Object.values(lastMsgObjs)
        console.log(lastMsgs)
        lastMsgs.sort(function (m1,m2) {
            // console.log(a,b)
            return m1.create_time - m2.create_time 
        })
        console.log(lastMsgs)

        return lastMsgs

    }
    render() {
        const { user, chat } = this.props
        const { users, chatMsgs } = chat
        const lastMsgs = this.getListMsga(chatMsgs,user._id) 
      
            
        console.log(lastMsgs)
        return (
            <List style={{ marginTop: 50, marginBottom: 50 }}>
                {
                    lastMsgs.map(item => {
                        console.log(users,item,user)
                        console.log(user[item.to] ,user._id)
                        const id = (item.to === user._id) ? item.from : item.to
                      const  header =  users[id].header
                       return (
                        <Item
                        extra={<Badge text={item.unReadCount}></Badge>}
                        thumb={header? require(`../../assets/images/${header}.png`) : null}
                        onClick={()=>this.props.history.push('chat/'+id)}
                    >
                        {console.log(item.to === user._id ? item.from : item.to)}
                        {users[item.to === user._id ? item.from : item.to].username}
                        <Brief>
                            {item.content}
                        </Brief></Item>
                       )
                       })
                }
            </List>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {}
)(Message)