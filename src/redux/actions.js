import {
    reqRegister,
    reqLogin
} from '../api'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'
const authSuccess = (user) => ({
    type: AUTH_SUCCESS,
    data: user
})
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    data: msg
})
export const register = (user) => {
    let {username,password,type,password2} = user;
    if(!username){
        return errorMsg("请填写用户名")
    }else if
    (password!==password2){
        return errorMsg("密码不一致")
    }
    return async dispatch => {
        let data = await reqRegister({username,password,type})
        console.log(data.data)
        if (data.data.code == 0) {
            dispatch(authSuccess(data.data))
        } else {
            dispatch(errorMsg(data.data.msg))
        }
    }
}


export const login = (user) => {
    let {username,password,type,} = user;
    if(!username||!password){
        return errorMsg("请填写用户名或密码")
    }else 
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