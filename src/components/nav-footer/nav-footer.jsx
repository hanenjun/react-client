import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

class NavFooter extends Component {
    constructor(props){
        super(props)
    }
    static propTypes = {
        navList : PropTypes.array.isRequired
    }
    render(){
        const path = this.props.location.pathname
        let  {navList} = this.props;
      
        console.log(navList)
        return (
            <TabBar>
                {navList.map((item,index)=>(
                    <Item key={item.path} title={item.text} icon={{uri:require(`./images/nav/${item.icon}.png`)}} selectedIcon={{uri:require(`./images/nav/${item.icon}-selected.png`)}} selected={path === item.path} onPress={()=>this.props.history.replace(item.path)}></Item>
                ))}
                
            </TabBar>
        )
    }
}

export default  withRouter(NavFooter)