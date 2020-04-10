import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RESET_USER,
    RECEIVE_USER,
    RECEIVE_USER_LIST
} from './action-types'
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data: msg
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
    type:RECEIVE_USER_LIST,
    data:data
})

// const reqUser = () => ({
//     re
//     // type: RESET_USER,
// })
export const getUserList = (type) => {
    return async dispatch =>{
        let data = await reqUserList(type)
        console.log(data)

        if(data.data.code == 0){
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
            dispatch(authSuccess(data.data))
        } else {
            dispatch(errorMsg(data.data.msg))
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
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}