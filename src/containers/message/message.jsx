import React,{Component} from 'react'
import {connect} from 'react-redux'
 class Message extends Component {
    render(){
        return (
            <div style={{marginBottom:50,marginTop:50}}></div>
        )
    }
}
export default connect(
    state => ({}),
    {}
)(Message)