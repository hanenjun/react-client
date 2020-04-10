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
    RECEIVE_USER_LIST
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
            console.log(   type, header,action.data.data)
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
            return   action.data
            
            break;
        case RESET_USER:
            console.log(action)
            return {
               ...initUser, msg:action.data
            }
            break;
        default:
            return state
            break;
    }
}

let initUserList = []

function userList(state = initUserList,action){
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
            break;
    
        default:
            return state
            break;
    }
}


export default combineReducers({
    user,
    userList
})