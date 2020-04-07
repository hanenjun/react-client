import React,{Component} from 'react'
import {Button} from 'antd-mobile'
export default  class NoteFound extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <div>
                    <h2>抱歉找不到页面</h2>
                    <Button type='primary' onClick={()=> this.props.history.replace('/')}>回到首页</Button>
                </div>
            </div>
        )
    }
}
