import axios from 'axios'
import { object } from 'prop-types'

export default function ajax(url,data={},type='GET'){
    let str = ""
    Object.keys(data).forEach(key=>{
        str+=key + "=" + data[key] + "&"
    })
    if(str){
        str.substring(0,str.length-1)
    }
    if(type=="GET"){
        return axios.get(url+"?"+str)
    }else{
        return axios.post(url,data)
    }
}