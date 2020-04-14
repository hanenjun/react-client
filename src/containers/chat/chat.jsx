import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Button ,Grid,Icon} from 'antd-mobile'
import { sendMsg ,readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
class Chat extends Component {
    state = {
        content: '',
        isShow:false
    }
    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if (content) {
            this.props.sendMsg({ to, from, content })
        }
        this.setState({ content: '' })
        this.setState({isShow:false})
    }
    componentWillMount(){
        const emojis  =['😀','😃','😄','😁','😆','😅','🥰','😍','😘','😗','😀','😃','😄','😁','😆','😅','🥰','😍','😘','😗','😀','😃','😄','😁','😆','😅','🥰','😍','😘','😗','😀','😃','😄','😁','😆','😅','🥰','😍','😘','😗']
        this.emojis=emojis.map(item=>({
            text:item
        }))
    }
    componentDidMount(){
        this.props.readMsg(this.props.match.params.userid,this.props.user._id)
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentDidUpdate(){
        window.scrollTo(0,document.body.scrollHeight)

    }
    componentWillUnmount(){
        this.props.readMsg(this.props.match.params.userid,this.props.user._id)

    }
    render() {
       if(this.state.isShow){
          setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
          },0)
       }

       
        const { users, chatMsgs } = this.props.chat

        const { user } = this.props
        const meId = user._id;
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid
        console.log(targetId)
        const chatId = [meId, targetId].sort().join('_')
        const {header,username} = users[targetId]
        console.log( user)
        const meHeader = user.header
        const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
        const targetIcon=header?require(`../../assets/images/${header}.png`):null
        const meIcon=header?require(`../../assets/images/${meHeader}.png`):null
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left' onClick={()=>this.props.history.goBack()}></Icon>} className='stick-header'>{username}</NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    <QueueAnim type='left' delay={10}>
                    {msgs.map(msg => {
                        console.log(msg)
                        console.log(meId,msg.from)
                        if (meId === msg.from) {
                            return (
                                <Item  key={msg._id} className={'chat-me'} extra={<img src={meIcon}></img>} >
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
                    </QueueAnim>
                   
                </List>
                <div className='am-tab-bar'>
                    <InputItem value={this.state.content} onChange={val => this.setState({ content: val })} placeholder='请输入' extra={<span> 
                    <span onClick={()=>this.setState({isShow:!this.state.isShow})}>😀&nbsp;&nbsp;&nbsp;</span>
                    <span onClick={this.handleSend}>发送</span>
                    </span>} onFocus={()=>this.setState({isShow:false})}></InputItem>
                   {this.state.isShow? <Grid
                        
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={item=>{
                            console.log(item)
                            this.setState({content:this.state.content + item.text})
                        }}
                    ></Grid>:null}
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg,readMsg }
)(Chat)