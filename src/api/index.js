import ajax from './axios'
export const reqRegister =  (user) => {
  return  ajax('/register',user,'POST')
}

export const reqLogin = ({username,password,type}) => {
   return ajax('/login',{username,password,type},'POST')
}


export const reqUpdateUser = (user) => {
   return ajax('/update',user,'POST')
}

export const reqUser = (user) => {
   return ajax('/user',user)
}