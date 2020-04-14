import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqMsgList,
    reqReadMsg
} from '../api'
import io from 'socket.io-client'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data: msg
})

const msgRead =({count,from,to}) => ({type:MSG_READ,data:{count,from,to}})

export const receiv_msg = (chatMsg, userid) => ({
    type: RECEIVE_MSG,
    data: {
        chatMsg,
        userid
    },

})
const receiveUser = (user) => ({
    type: RECEIVE_USER,
    data: user
})

export const resetUser = (msg) => ({
    type: RESET_USER,
    data: msg
})

const receiveUserList = (data) => ({
    type: RECEIVE_USER_LIST,
    data: data
})

export const receiveMsgList = ({
    users,
    chatMsgs,
    userid
}) => {
    return {
        type: RECEIVE_MSG_LIST,
        data: {
            users,
            chatMsgs,
            userid
        }
    }
}
async function getMsgList(dispatch, userid) {
    initIo(userid, dispatch)
    const response = await reqMsgList()
    const result = response.data
    if (result.code === 0) {
        const {
            users,
            chatMsgs
        } = result.data
        console.log(users,
            chatMsgs)
        dispatch(receiveMsgList({
            users,
            chatMsgs,
            userid
        }))
    }
}
// const reqUser = () => ({
//     re
//     // type: RESET_USER,
// })
export const getUserList = (type) => {
    return async dispatch => {
        let data = await reqUserList(type)
        console.log(data)

        if (data.data.code == 0) {
            dispatch(receiveUserList(data.data.data))
        }
        // else if(data.code == 1){
        //     dispatch(receiveUserList(data.msg))
        // }
    }
}


export const register = (user) => {
    let {
        username,
        password,
        type,
        password2
    } = user;
    if (!username) {
        return errorMsg("请填写用户名")
    } else if (password !== password2) {
        return errorMsg("密码不一致")
    }
    return async dispatch => {
        let data = await reqRegister({
            username,
            password,
            type
        })
        console.log(data.data)
        if (data.data.code == 0) {
            getMsgList(dispatch, data.data._id)
            dispatch(authSuccess(data.data))
        } else {
            dispatch(errorMsg(data.data.msg))
        }
    }
}

export const readMsg = (userid,id)=>{
    return async dispatch=>{
      const response =  await reqReadMsg(userid)
      const result = response.data
      if(result.code===0){
          const count = result.data
          const from = userid
          const to = id
          dispatch(msgRead({count,from,to}))
      }
    }
}


export const login = (user) => {
    let {
        username,
        password
    } = user;
    if (!username || !password) {
        return errorMsg("请填写用户名或密码")
    } else
        return async dispatch => {
            let data = await reqLogin(user)
            console.log(data)
            if (data.data.code == 0) {
                getMsgList(dispatch, data.data._id)
                dispatch(authSuccess(data.data))
            } else {
                dispatch(errorMsg(data.data.msg))
            }
        }
}

export const updataUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        console.log(response)
        const result = response.data
        if (result.code == 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code == 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

function initIo(userid, dispatch) {
    if (!io.socket) {
        io.socket = io('ws://localhost:5000')
        // 连接服务器, 得到与服务器的连接对象
        // 绑定监听, 接收服务器发送的消息

    }
    io.socket.on('receiveMsg', function (data) {
        console.log('客户端接收服务器发送的消息', data)
        if (userid === data.from || userid === data.to) {
            dispatch(receiv_msg(data, userid))
        }
    })
}
export const sendMsg = ({
    to,
    from,
    content
}) => {
    return dispatch => {
        console.log('发送', to, from, content)
        io.socket.emit('sendMsg', {
            from,
            to,
            content
        })
    }
}


// export const 