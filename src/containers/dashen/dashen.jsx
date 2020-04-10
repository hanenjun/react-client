import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'
 class DaShen extends Component {
     componentDidMount(){
        this.props.getUserList("laoban")
     }
    render(){
        console.log(this.props.userList)
        return (
            <UserList userList={this.props.userList}></UserList>
        )
    }
}
export default connect(
    state => ({userList:state.userList,
        user:state.user
    }),
    {getUserList}
)(DaShen)