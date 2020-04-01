import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
let initUser = {
    username:"",
    type:"",
    msg:"",
    redirectTo:""
}
 function user(state=initUser,action){
   switch (action.type) {
       case AUTH_SUCCESS:

           return {...action.data.data,redirectTo:"/"}
           break;
        case ERROR_MSG:
            console.log(action)
            return {...state,msg:action.data}
            break;
       default:
           return state
           break;
   }
}



export default combineReducers({
    user
})