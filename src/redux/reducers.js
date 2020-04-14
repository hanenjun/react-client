import {
    combineReducers
} from 'redux'
import {
    getRedirectTo
} from '../utils/index'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ,
} from './action-types'
let initUser = {
    username: "",
    type: "",
    msg: "",
    redirectTo: ""
}

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            let {
                type, header
            } = action.data.data;
            console.log(type, header, action.data.data)
            return {
                ...action.data.data, redirectTo: getRedirectTo(type, header)
            }
            break;
        case ERROR_MSG:
            console.log(action)
            return {
                ...state, msg: action.data
            }
            break;
        case RECEIVE_USER:
            console.log(action)
            return action.data

            break;
        case RESET_USER:
            console.log(action)
            return {
                ...initUser, msg: action.data
            }
            break;
        default:
            return state
            break;
    }
}

let initUserList = []

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
            break;

        default:
            return state
            break;
    }
}

let initChat = {
    users: {},
    chatMsgs: [

    ],
    unReadCount: 0
}

function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {
                users, chatMsgs, userid
            } = action.data
            console.log(action.data)
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => {
                    console.log(preTotal, msg,userid,(!msg.read && msg.to === userid ? 1 : 0))
                   return preTotal + (!msg.read && msg.to === userid ? 1 : 0)
                }, 0)
            }
            break;
        case RECEIVE_MSG:
            const {
                chatMsg
            } = action.data;
            return {
                users: state.users,
                    chatMsgs: [...state.chatMsgs, chatMsg],
                    unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
            break;
            case MSG_READ:
                const {from,to,count} = action.data
                // state.chatMsgs.forEach(msg=>{
                //     if(msg.from===from&&msg.to===to&&!msg.read){
                //         msg.read =true
                //     }
                // })
                return {
                    users: state.users,
                        chatMsgs: state.chatMsgs.map(msg=>{
                            if(msg.from===from&&msg.to===to&&!msg.read){
                       
                             return   {...msg,read:true}
                            }else{
                                return msg
                            }
                        }),
                        unReadCount: state.unReadCount - count
                }
                break
        default:
            return state
            break;
    }
}

export default combineReducers({
    user,
    userList,
    chat
})